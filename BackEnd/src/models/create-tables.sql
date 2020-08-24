CREATE DATABASE project;


-- \c project
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
    manager_id integer NOT NULL
);

CREATE TABLE user_on_project (
    id SERIAL PRIMARY KEY,
    project_id integer NOT NULL,
    user_id integer NOT NULL
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
      ON DELETE CASCADE
);

CREATE TABLE tags(
    tag_id SERIAL PRIMARY key,
    task_id integer NOT NULL,
    tagger_id integer NOT NULL,
    tagged_id integer NOT NULL,
    tagger_name varchar(50) NOT NULL,
    tagged_name varchar(50) NOT NULL,
);
