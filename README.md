# README
* Database creation

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups through groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
### Association
- has_many :users through groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
- has_many :chats

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|picture|text||
|message|text||
|groups_users_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :groups_users
