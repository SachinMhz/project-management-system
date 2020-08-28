CREATE DATABASE project;

\c project

CREATE TABLE users (
    user_id SERIAL PRIMARY key NOT NULL,
    display_name varchar(50) NOT NULL,
    email  varchar(50) UNIQUE NOT NULL,
    role varchar(50) NOT NULL,
    hash varchar NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY key,
    name varchar(50) UNQIUE NOT NULL,
    description varchar(250) NOT NULL,
    manager_id integer NOT NULL,
    FOREIGN KEY (manager_id) 
	  REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE user_on_project (
    id SERIAL PRIMARY KEY,
    project_id integer NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (project_id) 
	  REFERENCES projects(project_id)
      ON DELETE CASCADE,
    FOREIGN KEY (user_id) 
	  REFERENCES users(user_id)
      ON DELETE CASCADE
);

CREATE TABLE tasks(
    task_id SERIAL PRIMARY key,
    project_id integer NOT NULL,
    user_id integer,
    previous_user_id integer,
    title varchar NOT NULL,
    description varchar(250) NOT NULL,
    deadline date NOT NULL,
    FOREIGN KEY (project_id) 
	  REFERENCES projects(project_id)
      ON DELETE CASCADE
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY key,
    task_id integer NOT NULL,
    commenter_id integer NOT NULL,
    commenter_name varchar(50) NOT NULL,
    comment varchar(250) NOT NULL,
    comment_time TIME DEFAULT CURRENT_TIME,
    FOREIGN KEY (task_id) 
	  REFERENCES tasks(task_id)
      ON DELETE CASCADE,
    FOREIGN KEY (commenter_id) 
	  REFERENCES users(user_id)
      ON DELETE SET NULL
);

CREATE TABLE tags(
    tag_id SERIAL PRIMARY key,
    task_id integer NOT NULL,
    tagger_id integer NOT NULL,
    tagged_id integer NOT NULL,
    FOREIGN KEY (task_id) 
	  REFERENCES tasks(task_id)
      ON DELETE CASCADE,
    FOREIGN KEY (tagger_id) 
	  REFERENCES users(user_id)
      ON DELETE CASCADE,
    FOREIGN KEY (tagged_id) 
	  REFERENCES users(user_id)
      ON DELETE CASCADE
);


INSERT INTO users (display_name, email, hash , role)
  VALUES 
    ('Admin','admin@gmail.com','$2b$10$hQisEgFgNVpAB3cADBkpd.BVp7e14rMDtjj7ABN6E/rG3G0zuIx7.', 'admin'),
    ('Project Manager','projectmanager@gmail.com','$2b$10$hQisEgFgNVpAB3cADBkpd.BVp7e14rMDtjj7ABN6E/rG3G0zuIx7.', 'Project Manager'),
    ('Team Leader','teamleader@gmail.com','$2b$10$hQisEgFgNVpAB3cADBkpd.BVp7e14rMDtjj7ABN6E/rG3G0zuIx7.', 'Team Leader'),
    ('Engineer','engineer@gmail.com','$2b$10$hQisEgFgNVpAB3cADBkpd.BVp7e14rMDtjj7ABN6E/rG3G0zuIx7.', 'Engineer');

INSERT INTO projects (name, description, manager_id)
  VALUES
    ('An Awesome Project','This is an awesome description of an Awesome Project.',2);

INSERT INTO tasks (project_id, title, description, deadline)
  VALUES
    (1, 'An Awesome Task','This is an awesome description of an Awesome Task.','2020-09-05');
  
INSERT INTO comments (task_id, commenter_id, commenter_name, comment)
  VALUES
    (1, 1,'Admin', 'This is an awesome comment for an Awesome Task.');