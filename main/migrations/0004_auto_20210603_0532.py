# Generated by Django 3.1.6 on 2021-06-03 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20210429_0420'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='firstname',
            field=models.CharField(default='', max_length=50, verbose_name='First Name'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='lastname',
            field=models.CharField(default='', max_length=50, verbose_name='Last Name'),
            preserve_default=False,
        ),
    ]
