-- base.customers definition

CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL COMMENT 'User (credencial de login)',
  `name` varchar(100) NOT NULL COMMENT 'Nome',
  `address` varchar(255) DEFAULT NULL COMMENT 'Morada',
  `postal_code` varchar(25) DEFAULT NULL COMMENT 'Código postal',
  `city` varchar(50) DEFAULT NULL COMMENT 'Localidade',
  `landmark` varchar(255) DEFAULT NULL COMMENT 'Ponto de referência',
  `gps` varchar(100) DEFAULT NULL COMMENT 'Coordenadas GPS',
  `phone` varchar(20) DEFAULT NULL COMMENT 'Telefone',
  `email` varchar(100) DEFAULT NULL COMMENT 'Email (credencial de login)',
  `password` varchar(255) DEFAULT NULL COMMENT 'Password (credencial de login)',
  `timezone` varchar(50) NOT NULL COMMENT 'Timezone',
  `language` varchar(10) NOT NULL COMMENT 'Idioma',
  `active` tinyint(1) NOT NULL COMMENT '? Está activo',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_name_UN` (`name`),
  UNIQUE KEY `customers_user_UN` (`user`),
  UNIQUE KEY `customers_email_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='Clientes';


-- base.delivery_users definition

CREATE TABLE `delivery_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL COMMENT 'User (credencial de login)',
  `name` varchar(100) NOT NULL COMMENT 'Nome',
  `email` varchar(100) NOT NULL COMMENT 'Email (credencial de login)',
  `password` varchar(255) NOT NULL COMMENT 'Password (credencial de login)',
  `notification_email` tinyint(1) NOT NULL COMMENT '? Recebe notificações no email',
  `timezone` varchar(50) NOT NULL COMMENT 'Timezone',
  `authorization` varchar(50) NOT NULL COMMENT 'Autorização para utilização de app',
  `notification_endpoint` varchar(255) DEFAULT NULL COMMENT 'Endpoint do dispositivo móvel',
  `notification_p256dh` varchar(150) DEFAULT NULL COMMENT 'Key do dispositivo para receber notificações',
  `notification_auth` varchar(50) DEFAULT NULL COMMENT 'Autorização para receber notificações',
  `avatar` longtext NOT NULL COMMENT 'Avatar representante do utilizador',
  `active` tinyint(1) NOT NULL COMMENT '? Está activo',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `delivery_users_email_UN` (`email`),
  UNIQUE KEY `delivery_users_name_UN` (`name`),
  UNIQUE KEY `delivery_users_user_UN` (`user`),
  UNIQUE KEY `delivery_users_authorization_UN` (`authorization`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='Utilizadores Delivery';


-- base.log_debug definition

CREATE TABLE `log_debug` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_date` datetime NOT NULL COMMENT 'Data/Hora do evento',
  `event_category` varchar(50) NOT NULL COMMENT 'Categoria do evento',
  `module` varchar(50) NOT NULL COMMENT 'Módulo onde foi gerado o evento',
  `message` text NOT NULL COMMENT 'Mensagem do evento',
  `context` text DEFAULT NULL COMMENT 'Variáveis de contexto do evento',
  `trace` text NOT NULL COMMENT 'Percurso do evento',
  `user_name` varchar(100) NOT NULL COMMENT 'Utilizador responsável pelo evento',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Log de debug';


-- base.log_error definition

CREATE TABLE `log_error` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_date` datetime NOT NULL COMMENT 'Data/Hora do evento',
  `event_category` varchar(50) NOT NULL COMMENT 'Categoria do evento',
  `module` varchar(50) NOT NULL COMMENT 'Módulo onde foi gerado o evento',
  `message` text NOT NULL COMMENT 'Mensagem do evento',
  `context` text DEFAULT NULL COMMENT 'Variáveis de contexto do evento',
  `trace` text NOT NULL COMMENT 'Percurso do evento',
  `user_name` varchar(100) NOT NULL COMMENT 'Utilizador responsável pelo evento',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Log de Erro';


-- base.log_integration_default definition

CREATE TABLE `log_integration_default` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_category` varchar(50) NOT NULL COMMENT 'Categoria do pedido',
  `key1` varchar(255) NOT NULL COMMENT 'Key de pesquisa',
  `request_on` datetime NOT NULL COMMENT 'Data/Hora do pedido',
  `request_data` text NOT NULL COMMENT 'Dados do pedido',
  `answer_on` datetime NOT NULL COMMENT 'Data/Hora da resposta',
  `answer_data` text NOT NULL COMMENT 'Dados da resposta',
  PRIMARY KEY (`id`),
  KEY `log_integration_default_key1_IDX` (`key1`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Log de integração';


-- base.log_operation definition

CREATE TABLE `log_operation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_date` datetime NOT NULL COMMENT 'Data/Hora da operação',
  `event_category` varchar(50) NOT NULL COMMENT 'Categoria da operação',
  `module` varchar(50) NOT NULL COMMENT 'Módulo onde foi gerada a operação',
  `operation` varchar(150) NOT NULL COMMENT 'Operaçao',
  `message` varchar(255) NOT NULL COMMENT 'Mensagem da operação',
  `context` text DEFAULT NULL COMMENT 'Varuáveis de contexto da operação',
  `user_name` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela operação',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Log de Operação';


-- base.sys_apps definition

CREATE TABLE `sys_apps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL COMMENT 'Nome da app',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descrição da app',
  `_key` varchar(50) NOT NULL COMMENT 'Identificador da app',
  `vapid_subject` varchar(100) DEFAULT NULL COMMENT 'Notificações VAPID subject (mailto:email ou. website address)',
  `vapid_private_key` varchar(100) DEFAULT NULL COMMENT 'Notificações VAPID private key',
  `vapid_public_key` varchar(150) DEFAULT NULL COMMENT 'Notificações VAPID public key',
  `active` tinyint(1) NOT NULL COMMENT '? Está activa',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_apps_key_UN` (`_key`),
  UNIQUE KEY `sys_apps_name_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


-- base.sys_filters definition

CREATE TABLE `sys_filters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list` varchar(100) DEFAULT NULL COMMENT 'Lista (id do componente)',
  `user_id` int(11) NOT NULL COMMENT 'Utilizador proprietário do filtro',
  `name` varchar(150) NOT NULL COMMENT 'Nome do filtro',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descrição do filtro',
  `structure` varchar(255) DEFAULT NULL COMMENT 'Estrutura do filtro',
  `public` tinyint(1) NOT NULL COMMENT '? É público',
  `active` tinyint(1) NOT NULL COMMENT '? Está activo',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_filters_object_id_user_id_name_UN` (`user_id`,`list`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8 COMMENT='Permissões por função';


-- base.sys_groups definition

CREATE TABLE `sys_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Nome do grupo',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descrição do grupo',
  `active` tinyint(1) NOT NULL COMMENT '? Está activo',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_groups_name_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='Grupos de utilizador';


-- base.sys_permissions definition

CREATE TABLE `sys_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL COMMENT 'Código da permissão',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descrição da permissão',
  `type` char(1) NOT NULL COMMENT 'c->Crud; f->Funcional; m->Módulo; S->Sistema',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_permissions_code_UN` (`code`),
  KEY `sys_permissions_type_IDX` (`type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8 COMMENT='Permissões para funções de utilizador';


-- base.sys_roles definition

CREATE TABLE `sys_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'Nome da função',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descrição da função',
  `_system` tinyint(1) NOT NULL COMMENT '? Função de sistema',
  `active` tinyint(1) NOT NULL COMMENT '? Está activa',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_roles_name_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8 COMMENT='Funções de utilizador';


-- base.sys_translations definition

CREATE TABLE `sys_translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layer` char(2) DEFAULT NULL COMMENT 'Layer destino da tradução (be=backend; fe=frontend)',
  `source` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT 'Texto a traduzir',
  `en_us` varchar(255) DEFAULT NULL COMMENT 'Texto traduzido',
  `fr_fr` varchar(255) DEFAULT NULL COMMENT 'Texto traduzido',
  `es_es` varchar(255) DEFAULT NULL COMMENT 'Texto traduzido',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_translations_layer_source_UN` (`layer`,`source`)
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8;


-- base.sys_users definition

CREATE TABLE `sys_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL COMMENT 'User (credencial de login)',
  `name` varchar(100) NOT NULL COMMENT 'Nome',
  `email` varchar(100) NOT NULL COMMENT 'Email (credencial de login)',
  `password` varchar(255) NOT NULL COMMENT 'Password (credencial de login)',
  `notification_email` tinyint(1) NOT NULL COMMENT '? Recebe notificações no email',
  `notification_internal` tinyint(1) NOT NULL COMMENT '? Recebe notificações internas',
  `timezone` varchar(50) NOT NULL COMMENT 'Timezone',
  `language` varchar(10) NOT NULL COMMENT 'Idioma',
  `date_format` char(5) NOT NULL,
  `avatar` longtext DEFAULT NULL COMMENT 'Avatar representante do utilizador',
  `active` tinyint(1) NOT NULL COMMENT '? Está activo',
  `_system` tinyint(1) NOT NULL COMMENT 'Utilizador de sistema',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sys_users_email_UN` (`email`),
  UNIQUE KEY `sys_users_name_UN` (`name`),
  UNIQUE KEY `sys_users_user_UN` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8 COMMENT='Utilizadores';


-- base.delivery_packs definition

CREATE TABLE `delivery_packs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'Id do utilizador de delivery',
  `estimated_time` datetime NOT NULL COMMENT 'Hora prevista de inicio',
  `notes` varchar(255) DEFAULT NULL COMMENT 'Notas adicionais',
  `alerts` varchar(255) DEFAULT NULL COMMENT 'Alertas',
  `status` char(3) NOT NULL COMMENT 'Estados: PRE - Preparação; RDY - Pronto; DLV - Delivery; DNE - Terminado;',
  PRIMARY KEY (`id`),
  KEY `delivery_packs_user_id_IDX` (`user_id`) USING BTREE,
  CONSTRAINT `delivery_task_delivery_user_FK` FOREIGN KEY (`user_id`) REFERENCES `delivery_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Packs de tarefas';


-- base.delivery_tasks definition

CREATE TABLE `delivery_tasks` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL COMMENT 'Id do cliente',
  `pack_id` int(11) DEFAULT NULL COMMENT 'Id do pack de delivery',
  `request` varchar(4000) NOT NULL COMMENT 'Pedido',
  `price` float NOT NULL COMMENT 'Preço',
  `estimated_time` datetime NOT NULL COMMENT 'Hora prevista de entrega',
  `notes` varchar(255) DEFAULT NULL COMMENT 'Notas adicionais',
  `alerts` varchar(255) DEFAULT NULL COMMENT 'Alertas',
  `status` char(3) NOT NULL COMMENT 'Estado --- completar',
  PRIMARY KEY (`id`),
  KEY `delivery_tasks_pack_id_IDX` (`pack_id`) USING BTREE,
  KEY `delivery_task_customer_FK` (`customer_id`),
  CONSTRAINT `delivery_task_customer_FK` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `delivery_task_delivery_pack_FK` FOREIGN KEY (`pack_id`) REFERENCES `delivery_packs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='Tabela de tarefas';


-- base.infrastructures definition

CREATE TABLE `infrastructures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL COMMENT 'Infraestrutura pai',
  `name` varchar(100) NOT NULL COMMENT 'Nome da infraestrutura',
  `description` varchar(255) DEFAULT NULL COMMENT 'Descrição da infraestrutura',
  `icon` varchar(25) DEFAULT NULL COMMENT 'Icone da infraestrutura',
  `aggregator` tinyint(1) NOT NULL COMMENT '? É agregadora',
  `freeze` tinyint(1) NOT NULL COMMENT '? Nó "congelado"',
  `active` tinyint(1) NOT NULL COMMENT '? Está activa',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`id`),
  KEY `infrastructures_FK` (`parent_id`),
  CONSTRAINT `infrastructures_FK` FOREIGN KEY (`parent_id`) REFERENCES `infrastructures` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='Infraestruturas';


-- base.sys_role_permissions definition

CREATE TABLE `sys_role_permissions` (
  `role_id` int(11) NOT NULL COMMENT 'Id da função',
  `permission_id` int(11) NOT NULL COMMENT 'Id da permissão',
  `value` smallint(2) DEFAULT NULL COMMENT 'BitWise (C=1 R=2 U=4 D=8); null = Permissão sem detalhes',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `sys_role_permissions_FK_permission` (`permission_id`),
  CONSTRAINT `sys_role_permissions_FK_permission` FOREIGN KEY (`permission_id`) REFERENCES `sys_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sys_role_permissions_FK_role` FOREIGN KEY (`role_id`) REFERENCES `sys_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Permissões por função';


-- base.sys_user_groups definition

CREATE TABLE `sys_user_groups` (
  `user_id` int(11) NOT NULL COMMENT 'Id do utilizador',
  `group_id` int(11) NOT NULL COMMENT 'Id do grupo',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `sys_user_groups_FK_group` (`group_id`),
  CONSTRAINT `sys_user_groups_FK_group` FOREIGN KEY (`group_id`) REFERENCES `sys_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sys_user_groups_FK_user` FOREIGN KEY (`user_id`) REFERENCES `sys_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Utilizadores por grupo';


-- base.sys_user_roles definition

CREATE TABLE `sys_user_roles` (
  `user_id` int(11) NOT NULL COMMENT 'Id do utilizador',
  `role_id` int(11) NOT NULL COMMENT 'Id da função',
  `_by` varchar(100) NOT NULL COMMENT 'Utilizador responsável pela inserção/alteração do registo',
  `_on` datetime NOT NULL COMMENT 'UTC Data/Hora de inserção/alteração do registo',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `sys_user_roles_FK_role` (`role_id`),
  CONSTRAINT `sys_user_roles_FK_role` FOREIGN KEY (`role_id`) REFERENCES `sys_roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sys_user_roles_FK_user` FOREIGN KEY (`user_id`) REFERENCES `sys_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Utilizadores por função';