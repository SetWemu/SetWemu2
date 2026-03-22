-- Function to increment sold_count and check capacity
CREATE OR REPLACE FUNCTION handle_ticket_purchase()
RETURNS TRIGGER AS $$
BEGIN
  -- Check capacity
  IF (SELECT sold_count FROM ticket_tiers WHERE id = NEW.tier_id) >= 
     (SELECT capacity FROM ticket_tiers WHERE id = NEW.tier_id) THEN
    RAISE EXCEPTION 'Tier capacity reached. Cannot issue ticket.';
  END IF;

  -- Increment count
  UPDATE ticket_tiers
  SET sold_count = sold_count + 1
  WHERE id = NEW.tier_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger runs for EVERY ROW inserted into tickets
CREATE TRIGGER on_ticket_created
BEFORE INSERT ON tickets
FOR EACH ROW
EXECUTE FUNCTION handle_ticket_purchase();