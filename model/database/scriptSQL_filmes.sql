#Cria o database do projeto de filmes
create database db_filmes_20261_a;

#Ativa o uso do database de filmes
use db_filmes_20261_a;

#Cria a tabela de filme
create table tbl_filme(
id			 		int not null primary key auto_increment,
nome 				varchar(200) not null, 
data_lancamento 	date not null,
duracao 			time not null,
sinopse 			text not null,
avaliacao 			decimal(3,2) default null,
valor 				decimal(5,2) not null default 0,
capa 				varchar(255)
);

#################################################
#Cria a tabela de cargo
create table tbl_cargo(
	id		 			int not null primary key auto_increment,
    cargo	 			varchar(45) not null
);

#################################################
create table tbl_nacionalidade(
	id		 			int not null primary key auto_increment,
    nacionalidade	 	varchar(40) not null
    
);

drop table tbl_nascionalidade;


#####################################################
create table tbl_genero(
	id		 			int not null primary key auto_increment,
    genero	 			varchar(40) not null
);


#################################################
create table tbl_classificacao(
	id		 			int not null primary key auto_increment,
    classificacao	 	varchar(80) not null,
	caracteristica	 	varchar(80) not null
);

drop table tbl_classificacao;

##############################################################
create table tbl_pessoa(
	id		 			int not null primary key auto_increment,
    nome	 			varchar(80) not null,
	data_nascimento	 	date not null,
    biografia			text,
    foto 				varchar(255)
    
);


show tables;

#Inserir dados
insert into tbl_filme(
			 nome,
	  		 data_lancamento,
			 duracao,
			 sinopse,
			 avaliacao,
			 valor,
			 capa
            )
values (
		'Super Mario Galaxy: O Filme',
        '2026-04-02',
        '01:39:00',
        'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão.
        Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados
        embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
        '3',
        '50.70',
        'https://pimentanerd.com.br/wp-content/uploads/2026/01/yoshisupermario2.jpg'
        );
        
        select * from tbl_filme;
        select * from tbl_filme order by id desc;
        
        delete from tbl_filme where id > 0;
        
        
        update tbl_filme set
        nome = 'filme 02',
        data_lancamento = '2000-01-01',
        duracao = '2:00',
        sinopse = 'testando  o update no banco de dados',
        avaliacao = '1',
        valor = '10',
        capa = 'teste capa'
        where id = 14;
        
        select tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.data_lancamento, tbl_filme.capa,
				tbl_classificacao.classificacao,tbl_classificacao.caracteristica
                
                
                
                from tbl_filme
					inner join tbl_classificacao_filme_pais## inner join = existe uma relação entre as duas tabelas
						on tbl_filme.id = tbl_classificacao_filme_pais.id_filme
                        inner join tbl_classificacao
                        on tbl_classificacao.id = tbl_classificacao_filme_pais.id_classificacao;
                        
                        
                        
                        select * from tbl_filme_genero;
                        delete from tbl_filme_genero;
                        