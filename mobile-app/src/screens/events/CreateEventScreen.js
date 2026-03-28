import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Camera,
  MapPin,
  CalendarBlank,
  Clock,
  Tag,
  Plus,
  Trash,
  Crown,
  Palette,
  Users,
  Question,
  CurrencyDollar,
  Ticket,
  Images,
  Eye,
} from 'phosphor-react-native';
import UpgradeModal from './UpgradeModal';
import eventService from '../../api/eventService';
import { CaretDown } from 'phosphor-react-native';
import { useAuth } from '../../context/AuthContext';

const C = {
  bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
  blue: { light: '#ADF3FF', mid: '#8DDFF5' },
  gold: '#FFD700',
  text: { primary: '#F2F2F7', secondary: '#ABABAB', tertiary: '#6B6B6B' },
  border: { subtle: 'rgba(255,255,255,0.06)', light: 'rgba(255,255,255,0.10)' },
};

// LIMITS
const LIMITS = {
  personal: {
    ticketTypes: 2,
    maxTicketsPerType: 50,
    galleryImages: 1,
  },
  business: {
    ticketTypes: 999,
    maxTicketsPerType: 9999,
    galleryImages: 10,
  },
};

const Section = ({ title, children, isPremium }) => (
  <View style={s.section}>
    <View style={s.sectionHeader}>
      <Text style={s.sectionTitle}>{title}</Text>
      {isPremium && <Crown size={16} color={C.gold} weight="fill" />}
    </View>
    {children}
  </View>
);

const CreateEventScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('personal'); // TODO: Get from auth context

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const [tags, setTags] = useState('');
  const [heroImage, setHeroImage] = useState(null);
  const [tickets, setTickets] = useState([
    { id: '1', type: 'General Admission', price: '0', quantity: '' },
  ]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const { user } = useAuth();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  React.useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await eventService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCats();
  }, []);

  // PREMIUM FEATURES
  const [customBrandColor, setCustomBrandColor] = useState('#ADF3FF');
  const [brandLogo, setBrandLogo] = useState(null);
  const [earlyBirdPrice, setEarlyBirdPrice] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [enableAnalytics, setEnableAnalytics] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // PREMIUM CHECK
  const showUpgradeModal = () => {
    setShowUpgrade(true);
  };

  // IMAGE PICKER
  const pickImage = type => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        if (type === 'hero') {
          setHeroImage(uri);
        } else if (type === 'logo') {
          setBrandLogo(uri);
        }
      }
    });
  };

  const addTicket = () => {
    if (tickets.length >= LIMITS[userType].ticketTypes) {
      showUpgradeModal();
      return;
    }
    setTickets([
      ...tickets,
      { id: Date.now().toString(), type: '', price: '0', quantity: '' },
    ]);
  };

  const removeTicket = id => {
    if (tickets.length <= 1) {
      Alert.alert('Action Restricted', 'At least one ticket type is required.');
      return;
    }
    setTickets(tickets.filter(t => t.id !== id));
  };

  const updateTicket = (id, field, value) => {
    if (field === 'quantity') {
      const numValue = parseInt(value) || 0;
      if (numValue > LIMITS[userType].maxTicketsPerType) {
        showUpgradeModal();
        return;
      }
    }
    setTickets(tickets.map(t => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setMapsLink('');
    setTags('');
    setHeroImage(null);
    setTickets([{ id: '1', type: 'General Admission', price: '0', quantity: '' }]);
    setSelectedCategoryId(null);
    setAgreedToTerms(false);
    setEarlyBirdPrice('');
    setPromoCode('');
    setEnableAnalytics(false);
    setSelectedDate(new Date());
    setSelectedTime(new Date());
  };

  const handlePublish = async () => {
    // Validation
    if (!title.trim() || !date || !time || !location.trim() || !selectedCategoryId || !agreedToTerms) {
      Alert.alert('Missing Info', 'Please fill in all required fields and agree to terms.');
      return;
    }

    // Validate Tiers
    const invalidTier = tickets.find(t => !t.type || !t.quantity || parseInt(t.quantity) <= 0);
    if (invalidTier) {
      Alert.alert('Ticket Info Missing', 'Each ticket type must have a name and a capacity of more than 0.');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'User session not found. Please log in again.');
      return;
    }

    setIsPublishing(true);
    try {
      let finalHeroUrl = heroImage;
      let finalLogoUrl = brandLogo;

      // 2. Upload Hero Image if set and is local
      if (heroImage && typeof heroImage === 'string' && !heroImage.startsWith('http')) {
        console.log('[CreateEvent] Uploading hero image...');
        finalHeroUrl = await eventService.uploadEventImage(user.id, {
          uri: heroImage,
          name: `hero_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
      }

      // 3. Upload Brand Logo if set and is local
      if (brandLogo && typeof brandLogo === 'string' && !brandLogo.startsWith('http')) {
        console.log('[CreateEvent] Uploading brand logo...');
        finalLogoUrl = await eventService.uploadEventImage(user.id, {
          uri: brandLogo,
          name: `logo_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });
      }

      const eventData = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        google_maps_url: mapsLink.trim(),
        date: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD
        start_time: `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}:00`, // HH:mm:ss
        image_url: finalHeroUrl,
        category_id: selectedCategoryId,
        host_id: user.id,
        ticket_tiers: tickets.map(t => ({
          name: t.type || 'General Admission',
          price: parseFloat(t.price) || 0,
          capacity: parseInt(t.quantity) || 0,
        })),
        brand_color: userType === 'business' ? customBrandColor : null,
        brand_logo: userType === 'business' ? finalLogoUrl : null,
        early_bird_price: userType === 'business' ? earlyBirdPrice : null,
        promo_code: userType === 'business' ? promoCode : null,
      };

      console.log('[CreateEvent] Publishing event data:', eventData);
      const result = await eventService.createEvent(eventData);

      if (result) {
        resetForm();
        navigation.navigate('EventPublishSuccess', {
          event: result.event
        });
      }
    } catch (error) {
      console.error('[CreateEvent] Publish error:', error);
      Alert.alert('Publishing Failed', error.message || 'Something went wrong.');
    } finally {
      setIsPublishing(false);
    }
  };


  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color={C.text.primary} weight="bold" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Create Event</Text>
        <TouchableOpacity
          style={s.previewBtn}
          onPress={() =>
            navigation.navigate('EventPreview', {
              eventData: {
                title,
                description,
                date,
                time,
                location,
                tags,
                heroImage,
                tickets,
                mapsLink,
                selectedCategoryId,
              },
            })
          }
        >
          <Eye size={16} color={C.blue.light} weight="bold" />
          <Text style={s.previewText}>Preview</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <Section title="Event Cover Image">
          <TouchableOpacity
            style={s.heroImageBtn}
            onPress={() => pickImage('hero')}
          >
            {heroImage ? (
              <Image source={{ uri: heroImage }} style={s.heroImagePreview} />
            ) : (
              <View style={s.heroImagePlaceholder}>
                <Camera size={32} color={C.blue.light} weight="bold" />
                <Text style={s.heroImageText}>Upload Cover Image</Text>
                <Text style={s.heroImageSub}>Recommended: 1920x1080</Text>
              </View>
            )}
          </TouchableOpacity>
        </Section>

        <Section title={
          <Text style={s.sectionTitle}>Basic Information <Text style={s.asterisk}>*</Text></Text>
        }>
          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              placeholder="Event Title *"
              placeholderTextColor={C.text.tertiary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={[s.inputWrap, { height: 120, marginTop: 12 }]}>
            <TextInput
              style={[s.input, { height: '100%', textAlignVertical: 'top' }]}
              placeholder="About this event..."
              placeholderTextColor={C.text.tertiary}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </Section>

        <Section title={
          <Text style={s.sectionTitle}>Date & Time <Text style={s.asterisk}>*</Text></Text>
        }>
          <TouchableOpacity
            style={s.inputWrap}
            onPress={() => setShowDatePicker(true)}
          >
            <CalendarBlank size={18} color={C.blue.light} />
            <Text style={[s.input, !date && { color: C.text.tertiary }]}>
              {date || 'Select Date *'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, selected) => {
                setShowDatePicker(false);
                if (selected) {
                  setSelectedDate(selected);
                  setDate(selected.toLocaleDateString());
                }
              }}
            />
          )}

          <TouchableOpacity
            style={[s.inputWrap, { marginTop: 12 }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Clock size={18} color={C.blue.light} />
            <Text style={[s.input, !time && { color: C.text.tertiary }]}>
              {time || 'Select Time *'}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="default"
              onChange={(event, selected) => {
                setShowTimePicker(false);
                if (selected) {
                  setSelectedTime(selected);
                  setTime(selected.toLocaleTimeString());
                }
              }}
            />
          )}
        </Section>

        {/* LOCATION */}
        <Section title={
          <Text style={s.sectionTitle}>Location <Text style={s.asterisk}>*</Text></Text>
        }>
          <View style={s.inputWrap}>
            <MapPin size={18} color={C.blue.light} weight="fill" />
            <TextInput
              style={s.input}
              placeholder="Event Location Name *"
              placeholderTextColor={C.text.tertiary}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={[s.inputWrap, { marginTop: 12 }]}>
            <TextInput
              style={s.input}
              placeholder="Paste Google Maps Link"
              placeholderTextColor={C.text.tertiary}
              value={mapsLink}
              onChangeText={setMapsLink}
              autoCapitalize="none"
            />
          </View>
          <Text style={s.helperText}>
            Go to Google Maps → Share → Copy Link
          </Text>
        </Section>

        <Section title={
          <Text style={s.sectionTitle}>Event Category <Text style={s.asterisk}>*</Text></Text>
        }>
          <TouchableOpacity
            style={s.inputWrap}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Tag size={18} color={C.blue.light} weight="bold" />
            <Text style={[s.input, !selectedCategoryId && { color: C.text.tertiary }]}>
              {selectedCategoryId
                ? categories.find(c => c.id === selectedCategoryId)?.name
                : 'Select a Category *'}
            </Text>
            <CaretDown size={18} color={C.text.tertiary} />
          </TouchableOpacity>
        </Section>

        {/* TICKETS */}
        <Section title={
          <Text style={s.sectionTitle}>Tickets & Pricing <Text style={s.asterisk}>*</Text></Text>
        }>
          <Text style={s.limitText}>
            {userType === 'personal'
              ? `${tickets.length}/${LIMITS.personal.ticketTypes} ticket types • Max ${LIMITS.personal.maxTicketsPerType} per type`
              : 'Unlimited ticket types'}
          </Text>

          <View style={s.freeInfoBox}>
            <Question size={14} color={C.blue.light} weight="bold" />
            <Text style={s.freeInfoText}>Setting price to 0 make the event free for attendees.</Text>
          </View>

          {tickets.map((ticket, index) => (
            <View key={ticket.id} style={s.ticketCard}>
              <View style={s.ticketHeader}>
                <Ticket size={18} color={C.blue.light} weight="bold" />
                <Text style={s.ticketTitle}>Ticket {index + 1}</Text>
                {tickets.length > 1 && (
                  <TouchableOpacity onPress={() => removeTicket(ticket.id)}>
                    <Trash size={18} color="#FF453A" weight="bold" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={s.inputWrap}>
                <TextInput
                  style={s.input}
                  placeholder="Ticket Type * (e.g., VIP, General)"
                  placeholderTextColor={C.text.tertiary}
                  value={ticket.type}
                  onChangeText={val => updateTicket(ticket.id, 'type', val)}
                />
              </View>

              <View style={s.row}>
                <View style={[s.inputWrap, { flex: 1 }]}>
                  <CurrencyDollar size={18} color={C.blue.light} />
                  <TextInput
                    style={s.input}
                    placeholder="Price (LKR)"
                    placeholderTextColor={C.text.tertiary}
                    keyboardType="numeric"
                    value={ticket.price}
                    onChangeText={val => updateTicket(ticket.id, 'price', val)}
                  />
                </View>
                <View style={[s.inputWrap, { flex: 1 }]}>
                  <Users size={18} color={C.blue.light} />
                  <TextInput
                    style={s.input}
                    placeholder={`Max * (L: ${LIMITS[userType].maxTicketsPerType})`}
                    placeholderTextColor={C.text.tertiary}
                    keyboardType="numeric"
                    value={ticket.quantity}
                    onChangeText={val =>
                      updateTicket(ticket.id, 'quantity', val)
                    }
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={s.addButton} onPress={addTicket}>
            <Plus size={18} color={C.blue.light} weight="bold" />
            <Text style={s.addButtonText}>Add Another Ticket Type</Text>
          </TouchableOpacity>
        </Section>

        <Section title="Event Tags">
          <View style={s.inputWrap}>
            <Tag size={18} color={C.blue.light} weight="bold" />
            <TextInput
              style={s.input}
              placeholder="e.g. Music, Outdoor (comma sep)"
              placeholderTextColor={C.text.tertiary}
              value={tags}
              onChangeText={setTags}
            />
          </View>
        </Section>


        <Section title="Early Bird Pricing" isPremium>
          <TouchableOpacity
            style={s.premiumCard}
            onPress={() => userType === 'personal' && showUpgradeModal()}
            activeOpacity={userType === 'personal' ? 0.7 : 1}
            disabled={userType === 'business'}
          >
            <View style={s.inputWrap}>
              <CurrencyDollar size={18} color={C.blue.light} />
              <TextInput
                style={s.input}
                placeholder="Early Bird Price (LKR)"
                placeholderTextColor={C.text.tertiary}
                keyboardType="numeric"
                value={earlyBirdPrice}
                onChangeText={setEarlyBirdPrice}
                editable={userType === 'business'}
              />
            </View>
          </TouchableOpacity>
        </Section>

        <Section title="Promo Codes" isPremium>
          <TouchableOpacity
            style={s.premiumCard}
            onPress={() => userType === 'personal' && showUpgradeModal()}
            activeOpacity={userType === 'personal' ? 0.7 : 1}
            disabled={userType === 'business'}
          >
            <View style={s.inputWrap}>
              <Tag size={18} color={C.blue.light} weight="bold" />
              <TextInput
                style={s.input}
                placeholder="Create Promo Code"
                placeholderTextColor={C.text.tertiary}
                value={promoCode}
                onChangeText={setPromoCode}
                editable={userType === 'business'}
                autoCapitalize="characters"
              />
            </View>
          </TouchableOpacity>
        </Section>

        <Section title="Ticket Design" isPremium>
          <TouchableOpacity
            style={s.premiumCard}
            onPress={() => userType === 'personal' && showUpgradeModal()}
            activeOpacity={userType === 'personal' ? 0.7 : 1}
            disabled={userType === 'business'}
          >
            <Text style={s.premiumLabel}>Brand Color</Text>
            <View style={s.colorRow}>
              {['#ADF3FF', '#FF453A', '#30D158', '#FFD700', '#8B5CF6'].map(
                color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      s.colorDot,
                      {
                        backgroundColor: color,
                        borderWidth: customBrandColor === color ? 3 : 0,
                        borderColor: '#fff',
                      },
                    ]}
                    onPress={() =>
                      userType === 'business' && setCustomBrandColor(color)
                    }
                    disabled={userType === 'personal'}
                  />
                ),
              )}
            </View>

            <TouchableOpacity
              style={s.logoUpload}
              onPress={() =>
                userType === 'business' ? pickImage('logo') : showUpgradeModal()
              }
            >
              <Palette size={18} color={C.gold} weight="bold" />
              <Text style={s.logoUploadText}>Add Brand Logo to Tickets</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Section>

        <Section title="Advanced Analytics" isPremium>
          <TouchableOpacity
            style={s.premiumCard}
            onPress={() => userType === 'personal' && showUpgradeModal()}
            activeOpacity={userType === 'personal' ? 0.7 : 1}
            disabled={userType === 'business'}
          >
            <View style={s.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.toggleTitle}>Advanced Analytics</Text>
                <Text style={s.toggleSub}>
                  Track conversions, demographics & more
                </Text>
              </View>
              <Switch
                value={enableAnalytics}
                onValueChange={
                  userType === 'business'
                    ? setEnableAnalytics
                    : () => showUpgradeModal()
                }
                trackColor={{ true: C.blue.light, false: C.text.tertiary }}
                disabled={userType === 'personal'}
              />
            </View>
          </TouchableOpacity>
        </Section>

        <Section title={
          <Text style={s.sectionTitle}>Legal <Text style={s.asterisk}>*</Text></Text>
        }>
          <TouchableOpacity
            style={s.checkboxRow}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View style={[s.checkbox, agreedToTerms && s.checkboxChecked]}>
              {agreedToTerms && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.checkboxText}>
              I agree to SetWemu's{' '}
              <Text style={s.link}>Terms & Conditions</Text> and{' '}
              <Text style={s.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </Section>
      </ScrollView>

      <View style={s.bottomBar}>
        <TouchableOpacity
          style={[
            s.publishButton,
            (!agreedToTerms || isPublishing) && s.publishButtonDisabled,
          ]}
          onPress={handlePublish}
          disabled={!agreedToTerms || isPublishing}
        >
          <Text style={s.publishButtonText}>
            {isPublishing ? 'Publishing...' : 'Publish Event'}
          </Text>
        </TouchableOpacity>
      </View>

      <UpgradeModal
        visible={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />

      <Modal
        visible={showCategoryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.categoryModal}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Text style={s.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {isLoadingCategories ? (
                <Text style={s.loadingText}>Loading categories...</Text>
              ) : (
                categories.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      s.categoryItem,
                      selectedCategoryId === cat.id && s.categoryItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedCategoryId(cat.id);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        s.categoryItemText,
                        selectedCategoryId === cat.id && s.categoryItemTextSelected,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg.primary },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border.subtle,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.bg.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border.light,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.text.primary },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: C.bg.card,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  previewText: { fontSize: 12, fontWeight: '700', color: C.blue.light },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: C.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  asterisk: {
    color: '#FF453A',
    fontWeight: 'bold',
  },
  freeInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(173, 243, 255, 0.05)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(173, 243, 255, 0.1)',
  },
  freeInfoText: {
    fontSize: 12,
    color: C.blue.light,
    fontWeight: '600',
  },
  limitText: {
    fontSize: 11,
    color: C.text.tertiary,
    marginBottom: 10,
    fontWeight: '600',
  },
  heroImageBtn: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: C.bg.card,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: C.border.light,
  },
  heroImagePreview: { width: '100%', height: '100%' },
  heroImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImageText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text.primary,
    marginTop: 12,
  },
  heroImageSub: { fontSize: 12, color: C.text.secondary, marginTop: 4 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bg.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: C.border.light,
    gap: 10,
  },
  input: { flex: 1, color: C.text.primary, fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 10, marginTop: 12 },
  helperText: { fontSize: 11, color: C.text.secondary, marginTop: 6 },
  ticketCard: {
    backgroundColor: C.bg.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ticketTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: C.text.primary,
  },
  faqCard: {
    backgroundColor: C.bg.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border.light,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  faqTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: C.text.primary },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: C.border.light,
    marginTop: 8,
  },
  addButtonText: { fontSize: 14, fontWeight: '700', color: C.blue.light },
  galleryButton: {
    alignItems: 'center',
    paddingVertical: 32,
    borderRadius: 16,
    backgroundColor: C.bg.card,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: C.border.light,
  },
  galleryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text.primary,
    marginTop: 10,
  },
  galleryButtonSub: { fontSize: 12, color: C.text.secondary, marginTop: 4 },
  premiumCard: {
    backgroundColor: C.bg.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  premiumLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  colorRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  logoUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: C.gold,
  },
  logoUploadText: { fontSize: 13, fontWeight: '700', color: C.gold },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: C.text.primary,
    marginBottom: 4,
  },
  toggleSub: { fontSize: 12, color: C.text.secondary },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: C.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: C.blue.light, borderColor: C.blue.light },
  checkmark: { color: '#141416', fontSize: 14, fontWeight: '900' },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: C.text.primary,
    lineHeight: 20,
  },
  link: { color: C.blue.light, fontWeight: '700' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 35,
    backgroundColor: C.bg.card,
    borderTopWidth: 1,
    borderTopColor: C.border.subtle,
  },
  publishButton: {
    backgroundColor: C.blue.light,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonDisabled: { opacity: 0.4 },
  publishButtonText: { fontSize: 16, fontWeight: '900', color: '#141416' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  categoryModal: {
    backgroundColor: C.bg.elevated,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: C.border.subtle,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: C.text.primary },
  closeText: { fontSize: 14, fontWeight: '700', color: C.blue.light },
  categoryItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: C.border.subtle,
  },
  categoryItemSelected: { backgroundColor: 'rgba(173,243,255,0.05)' },
  categoryItemText: { fontSize: 15, fontWeight: '600', color: C.text.secondary },
  categoryItemTextSelected: { color: C.blue.light, fontWeight: '700' },
  loadingText: {
    padding: 40,
    textAlign: 'center',
    color: C.text.tertiary,
    fontSize: 14,
  },
});

export default CreateEventScreen;
