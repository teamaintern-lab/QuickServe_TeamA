✅ STEP 1 — Create database

Open MySQL Workbench or terminal and run:

CREATE DATABASE quickserve_db;
USE quickserve_db;

✅ STEP 2 — Create ALL tables (final, optimized version)

This is the full schema matching your entire frontend.

🧱 1. users (all users stored here)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'provider') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🧱 2. provider_details (extra info for providers)
CREATE TABLE provider_details (
    provider_id BIGINT PRIMARY KEY,
    service_category VARCHAR(100),
    custom_service VARCHAR(255),
    description TEXT,
    FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE
);

🧱 3. service_categories (clean list of all categories)
CREATE TABLE service_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE
);


Insert initial category list:

INSERT INTO service_categories (category_name) VALUES
('electrical'),
('plumbing'),
('cleaning'),
('carpentry'),
('painting'),
('ac-maintenance'),
('appliance-repair'),
('pest-control'),
('landscaping'),
('other');

🧱 4. services (providers create services here)
CREATE TABLE services (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    provider_id BIGINT NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE
);

🧱 5. provider_services (optional but useful mapping)

If a provider belongs to multiple categories.

CREATE TABLE provider_services (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    provider_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,

    FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE
);

🧱 6. bookings (stores booking requests)
CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    provider_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    booking_date DATE NOT NULL,
    booking_time VARCHAR(50),
    status ENUM('pending', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (provider_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

🧱 7. auth_tokens (optional refresh token storage)
CREATE TABLE auth_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

🧪 STEP 3 — Insert sample data for testing
A provider
INSERT INTO users (username, email, password_hash, role)
VALUES ('John Electrician', 'john@example.com', 'dummy_password_hash', 'provider');

His provider details
INSERT INTO provider_details (provider_id, service_category, custom_service, description)
VALUES (1, 'electrical', NULL, 'Expert electrician with 5+ years experience');

A service he provides
INSERT INTO services (provider_id, service_name, price, description)
VALUES (1, 'Electrical Repair', 500.00, 'General electrical fault diagnosis and repair');

A customer
INSERT INTO users (username, email, password_hash, role)
VALUES ('Aditi Sharma', 'aditi@example.com', 'dummy_hash', 'customer');

A booking
INSERT INTO bookings (customer_id, provider_id, service_id, location, description, booking_date, booking_time)
VALUES (2, 1, 1, 'Whitefield, BLR', 'Power outage in bedroom', '2025-11-27', '10:00 AM');

🧪 STEP 4 — Test your database

Run:

SELECT * FROM users;
SELECT * FROM provider_details;
SELECT * FROM services;
SELECT * FROM bookings;


Everything should appear correctly.