CREATE TABLE IF NOT EXISTS  users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS  auctions (
    auction_id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS bids (
    bid_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT NOT NULL,
    user_id INT NOT NULL,
    bid_amount DECIMAL(10, 2) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO auctions (car_id, start_time, end_time)
VALUES
    (1, '2024-12-07 10:00:00', '2024-12-07 12:00:00'),
    (2, '2024-12-07 12:30:00', '2024-12-07 14:30:00'),
    (3, '2024-12-07 15:00:00', '2024-12-07 17:00:00');