-- Membuat tabel User
CREATE TABLE User (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'worker') NOT NULL,
    jenis_kelamin ENUM('Pria', 'Wanita') null,
    birth_date DATE null,
    profile_picture TEXT NULL,
    phone_number VARCHAR(20) NULL,
    bio TEXT NULL,
    address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Session (
    id CHAR(36) NOT NULL PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    is_login BOOLEAN NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logout_time TIMESTAMP NULL,
    CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Membuat tabel Client
CREATE TABLE Client (
    id CHAR(36) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    PRIMARY KEY (id),
    CONSTRAINT fk_client_user FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

-- Membuat tabel Worker
CREATE TABLE Worker (
    id CHAR(36) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    PRIMARY KEY (id),
    CONSTRAINT fk_worker_user FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);

-- Membuat tabel Project
CREATE TABLE Project (
    id CHAR(36) NOT NULL PRIMARY KEY,
    client_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'completed') NOT NULL,
    -- photo_url TEXT NULL,
    document_url VARCHAR(255) NULL,
    category VARCHAR(255) NULL,
    budget_lower DECIMAL(10, 2) NULL,
    budget_upper DECIMAL(10, 2) NULL,
    deadline TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_client FOREIGN KEY (client_id) REFERENCES Client(id) ON DELETE CASCADE
);

-- Membuat tabel Application
CREATE TABLE Application (
    id CHAR(36) NOT NULL PRIMARY KEY,
    project_id CHAR(36) NOT NULL,
    worker_id CHAR(36) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL,
    -- document_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_application_project FOREIGN KEY (project_id) REFERENCES Project(id) ON DELETE CASCADE,
    CONSTRAINT fk_application_worker FOREIGN KEY (worker_id) REFERENCES Worker(id) ON DELETE CASCADE
);

-- Membuat tabel Progress
CREATE TABLE Progress (
    id CHAR(36) NOT NULL PRIMARY KEY,
    project_id CHAR(36) NOT NULL,
    worker_id CHAR(36) NOT NULL,
    description TEXT,
    status ENUM('not_started', 'in_progress', 'completed') NOT NULL,
    document_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_progress_project FOREIGN KEY (project_id) REFERENCES Project(id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_worker FOREIGN KEY (worker_id) REFERENCES Worker(id) ON DELETE CASCADE
);

-- Membuat tabel Payment
CREATE TABLE Payment (
    id CHAR(36) NOT NULL PRIMARY KEY,
    project_id CHAR(36) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_project FOREIGN KEY (project_id) REFERENCES Project(id) ON DELETE CASCADE
);

-- Membuat tabel Review
CREATE TABLE Review (
    id CHAR(36) NOT NULL PRIMARY KEY,
    project_id CHAR(36) NOT NULL,
    reviewer_id CHAR(36) NOT NULL,
    reviewee_id CHAR(36) NOT NULL,
    rating TINYINT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_project FOREIGN KEY (project_id) REFERENCES Project(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviewer_user FOREIGN KEY (reviewer_id) REFERENCES User(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviewee_user FOREIGN KEY (reviewee_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Membuat tabel Notification
CREATE TABLE Notification (
    id CHAR(36) NOT NULL PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);
