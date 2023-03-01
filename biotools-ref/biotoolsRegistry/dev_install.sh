docker exec biotools-backend python manage.py makemigrations
docker exec biotools-backend python manage.py migrate

###export db

docker cp export_create_table.sh biotools-mysql:/root
docker cp export_insert_table.sh biotools-mysql:/root

docker exec biotools-mysql bash /root/export_create_table.sh  && docker cp biotools-mysql:/create_table.sql create_table.sql 
docker exec biotools-mysql bash /root/export_insert_table.sh  && docker cp biotools-mysql:/insert.sql insert.sql 
####################################


#docker cp initial_insert_db.sql biotools-mysql:/root
#docker cp load_initial_db.sh biotools-mysql:/root
#docker exec biotools-mysql bash /root/load_initial_db.sh



#ERROR 1452 (23000) at line 5: Cannot add or update a child row: a foreign key constraint fails (`elixir`.`elixir_accessibility`, CONSTRAINT `elixir_accessibility_resource_id_96717625_fk_elixir_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `elixir_resource` (`id`))


docker exec -it biotools-backend python manage.py createsuperuser
docker exec biotools-backend bash /elixir/application/backend/data/edam/update_edam.sh

docker cp update_site_settings.sql biotools-mysql:/root
docker cp update_site_settings.sh biotools-mysql:/root

docker exec biotools-mysql bash /root/update_site_settings.sh


docker exec biotools-backend python manage.py es_purge
docker exec biotools-backend python manage.py es_regenerate



