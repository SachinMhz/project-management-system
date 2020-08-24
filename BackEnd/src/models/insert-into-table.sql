-- user table
INSERT INTO users
    (display_name, email, role, hash )
VALUES ('Sachin Maharjan', 'sachin.mhz.sm@gmail.com','admin','password');


INSERT INTO projects
    (name, description, manager_id)
VALUES ('Project Manager Name', 'This is a Project Description', 2);

INSERT INTO user_on_project 
    ( project_id, user_id )
VALUES (1, 6);

CREATE TABLE tasks(
    task_id SERIAL PRIMARY key,
    project_id integer NOT NULL,
    user_id integer NOT NULL,
    title varchar NOT NULL,
    description varchar(250) NOT NULL,
    deadline date NOT NULL
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY key,
    task_id integer NOT NULL,
    commenter_id integer NOT NULL,
    commenter_name varchar(50) NOT NULL,
    comment varchar(250) NOT NULL,
    comment_time TIME DEFAULT CURRENT_TIME,
);

CREATE TABLE tags(
    tag_id SERIAL PRIMARY key,
    task_id integer NOT NULL,
    tagger_id integer NOT NULL,
    tagged_id integer NOT NULL,
    tagger_name varchar(50) NOT NULL,
    tagged_name varchar(50) NOT NULL,
);


-- join
WITH project_user_bridge AS (SELECT * FROM user_on_project where project_id = 5)
SELECT u.display_name, u.user_id, p.project_id FROM
    users u JOIN project_user_bridge p 
    ON u.user_id = p.user_id;
