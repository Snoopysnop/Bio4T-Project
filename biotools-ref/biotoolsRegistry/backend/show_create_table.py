import django

import importlib
import sys,os


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "elixirapp.settings")


django.setup()

from django.db.migrations.state import ModelState
from django.db.migrations import operations
from django.db.migrations.migration import Migration
from django.db import connections
from django.db.migrations.state import ProjectState

def get_create_sql_for_model(model):

    model_state = ModelState.from_model(model)
    print(model_state)
    # Create a fake migration with the CreateModel operation
    cm = operations.CreateModel(name=model_state.name, fields=model_state.fields)
    migration = Migration("fake_migration", "app")
    migration.operations.append(cm)

    # Let the migration framework think that the project is in an initial state
    state = ProjectState()

    # Get the SQL through the schema_editor bound to the connection
    connection = connections['default']
    with connection.schema_editor(collect_sql=True, atomic=migration.atomic) as schema_editor:
        state = migration.apply(state, schema_editor, collect_sql=True)

    # return the CREATE TABLE statement
    return "\n".join(schema_editor.collected_sql)

if __name__ == "__main__":




    #if len(sys.argv) < 2:
    #    print("Usage: {} <app.model>".format(sys.argv[0]))
    #    sys.exit(100)

    #app, model_name = sys.argv[1].split('.')

    #models = importlib.import_module("{}.models".format(app))
    #model = getattr(models, model_name)
    models = importlib.import_module("elixir.models")
    print(models)
    print(dir(models))
    model_name="DomainResource"
    model = getattr(models, model_name)

    print(model)
    rv = get_create_sql_for_model(model)
    print(rv)




