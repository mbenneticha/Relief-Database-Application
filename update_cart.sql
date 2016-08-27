DELIMITER //

CREATE PROCEDURE update_cart (IN cid INT, IN pid INT, IN qty INT)
BEGIN

    IF EXISTS (SELECT * FROM cart_contents WHERE cart_id=cid AND product_id=pid)
    THEN
        IF (qty = 0)
        THEN
            DELETE FROM cart_contents WHERE (cart_id=cid AND product_id=pid);
        ELSEIF (qty > 0)
        THEN
            UPDATE cart_contents SET product_qty=qty WHERE (cart_id=cid AND product_id=pid);
        END IF;

    ELSEIF (qty > 0)
    THEN
        INSERT INTO cart_contents (cart_id, product_id, product_qty) VALUES (cid, pid, qty);

    END IF;

END//

DELIMITER ;
