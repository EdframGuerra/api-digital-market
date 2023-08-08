CREATE DATABASE digital_market;

CREATE TABLE usuarios(
  ID serial PRIMARY KEY,
  nome text,
  nome_loja text,
  email text,
  senha text
);

CREATE TABLE produtos(
  ID serial PRIMARY KEY,
  usuario_id int references usuarios(ID),
  nome text,
  quantidade int,
  categoria text,
  peco int,
  descricao text,
  imagem text
);