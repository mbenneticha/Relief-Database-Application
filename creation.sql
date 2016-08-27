INSERT INTO location (name, description)
  VALUES ('India', 'A large country in South Asia');

INSERT INTO location (name, description)
  VALUES ('Congo', 'A large country in Africa');

INSERT INTO product (name, description, location_id, price, qty_on_hand)
  VALUES ('India-Water', 'Drinking water', (SELECT id FROM location WHERE name='India'), 3.00, 5);

INSERT INTO product (name, description, location_id, price, qty_on_hand)
  VALUES ('India-First Aid', 'First Aid Supplies', (SELECT id FROM location WHERE name='India'), 5.00, 5);
  
INSERT INTO product (name, description, location_id, price, qty_on_hand)
  VALUES ('India-Donation', 'Money for a worthy cause', (SELECT id FROM location WHERE name='India'), 1.00, 400000);

INSERT INTO product (name, description, location_id, price, qty_on_hand)
  VALUES ('Congo-First Aid', 'First Aid Supplies', (SELECT id FROM location WHERE name='Congo'), 5.00, 5);

INSERT INTO product (name, description, location_id, price, qty_on_hand)
  VALUES ('Congo-Water-Purification', 'Purification system for drinking water', (SELECT id FROM location WHERE name='Congo'), 15.00, 5);
  
INSERT INTO product (name, description, location_id, price, qty_on_hand)
  VALUES ('Congo-Donation', 'Money for a worthy cause', (SELECT id FROM location WHERE name='Congo'), 1.00, 400000);
  
INSERT INTO customer (name, address, phone, email)
  VALUES ('Bob Loblaw', '123 Memory Lane', '(541) 555-1234', 
          'boblob@yahoo.com');
          
INSERT INTO cart_status (name)
  VALUES ('empty'), ('not ordered'), ('processing'), ('ordered');
  
