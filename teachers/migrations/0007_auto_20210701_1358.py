# Generated by Django 3.1.5 on 2021-07-01 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0006_auto_20210701_1245'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaverequest',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='is_pending',
            field=models.BooleanField(default=True),
        ),
    ]
