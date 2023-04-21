use Groceries;

create table user (
	id varchar(50) primary key,
    email varchar(50),
    password varchar(50)
);

create table item (
	id varchar(50) primary key,
    name varchar(50),
    is_need bool,
    price double,
    details varchar(10000),
    frequency varchar(25),
    date_created date,
    refresh_date date
);

create table user_item (
	user_id varchar(50),
    item_id varchar(50),
    
    primary key (user_id, item_id),
    
    foreign key fk_user (user_id) references user (id),
    foreign key fk_item (item_id) references item (id)
);

insert into user (id, email, password) values ('test_user_1', 'test@mail.com', 'password');
select * from user_item;
insert into user_item (user_id, item_id) values ('test_user_1', 'L4C7GCQWP5M8LBE49J07');
select * from item;

use groceries;
select * from user_item;