# Generated by Django 3.1.5 on 2021-06-27 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gradedassignment',
            old_name='graded',
            new_name='gradepoints',
        ),
    ]
