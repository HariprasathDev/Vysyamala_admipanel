# Generated by Django 5.0.6 on 2024-06-20 03:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0016_alter_logindetailstemp_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='logindetailstemp',
            table='logindetails_temp',
        ),
    ]
