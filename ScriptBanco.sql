/*Criar Base*/
create database controle_gastos;

/*Criar Tabela*/
create table gastos (id integer primary key AUTO_INCREMENT,
name varchar(100),
cost float,
category varchar(10));

/*Adicionando campo de Data, onde pega automaticamente a data/hora do banco*/
ALTER TABLE gastos
ADD COLUMN data TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
