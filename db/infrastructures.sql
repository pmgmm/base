INSERT INTO base.infrastructures (id,parent_id,name,description,icon,aggregator,freeze,active,`_by`,`_on`) VALUES
	 (1,NULL,'Nó 1',NULL,NULL,1,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (2,NULL,'Nó 2',NULL,'truck',1,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (3,1,'Nó 11',NULL,NULL,1,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (4,1,'Nó 12',NULL,NULL,1,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (5,2,'Nó 21',NULL,'warehouse',1,1,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (6,2,'Nó 22',NULL,NULL,1,0,0,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (7,3,'Nó 111',NULL,NULL,1,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (8,3,'Nó 112',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (9,4,'Nó 121',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (10,4,'Nó 122',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (11,5,'Nó 211',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (12,5,'Nó 212',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (13,6,'Nó 221',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (14,6,'Nó 222',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (15,7,'Nó 1111',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (16,7,'Nó 1112',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (17,7,'Nó 1113',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (18,7,'Nó 1114',NULL,NULL,1,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0'),
	 (19,18,'Nó 11141',NULL,NULL,0,0,1,'Pedro Monteiro','2021-04-06 00:00:00.0');