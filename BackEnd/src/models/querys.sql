CREATE DATABASE project;


-- \c project
CREATE TABLE users1 (
    user_id serial primary key not null,
    display_name varchar(50) not null
    );

CREATE TABLE projects1 (
    project_id serial primary key,
    name varchar(50) not null,
    manager_id integer not null,
    FOREIGN KEY(manager_id) 
	  REFERENCES users1(user_id)
      ON DELETE CASCADE
    );

CREATE TABLE tasks(
    task_id serial primary key,
    project_id integer not null,
    user_id integer not null,
    description varchar(250) not null,
    deadline date not null
    );

CREATE TABLE comments(
    comment_id serial primary key,
    task_id integer not null,
    commenter_id integer not null,
    commenter_name varchar(50) not null,
    comment varchar(250) not null
    );

CREATE TABLE tags(
    tag_id serial primary key,
    task_id integer not null,
    tagger_id integer not null,
    tagged_id integer not null,
    tagger_name varchar(50) not null,
    tagged_name varchar(50) not null,
    comment varchar(250) not null
    );


UPDATE tasks SET user_id= 1, previous_assignee_id=2
                       WHERE task_id = 3  RETURNING *;