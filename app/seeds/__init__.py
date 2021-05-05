from flask.cli import AppGroup
from .users import seed_users, undo_users
from .insurances import seed_insurances, undo_insurances
from .professionals import seed_professionals, undo_professionals
from .patients import seed_patients, undo_patients
from .tasks import seed_tasks, undo_tasks
from .assignments import seed_assignments, undo_assignments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_insurances()
    seed_professionals()
    seed_patients()
    seed_tasks()
    seed_assignments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_insurances()
    undo_professionals()
    undo_patients()
    undo_tasks()
    undo_assignments()
    # Add other undo functions here
