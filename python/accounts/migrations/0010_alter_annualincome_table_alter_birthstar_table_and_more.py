# Generated by Django 5.0.6 on 2024-06-20 01:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_rename_value_annualincome_income'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='annualincome',
            table='masterannualincome',
        ),
        migrations.AlterModelTable(
            name='birthstar',
            table='masterbirthstar',
        ),
        migrations.AlterModelTable(
            name='caste',
            table='mastercaste',
        ),
        migrations.AlterModelTable(
            name='complexion',
            table='mastercomplexion',
        ),
        migrations.AlterModelTable(
            name='country',
            table='mastercountry',
        ),
        migrations.AlterModelTable(
            name='dasabalance',
            table='masterdasabalance',
        ),
        migrations.AlterModelTable(
            name='district',
            table='masterdistrict',
        ),
        migrations.AlterModelTable(
            name='familystatus',
            table='masterfamilystatus',
        ),
        migrations.AlterModelTable(
            name='familytype',
            table='masterfamilytype',
        ),
        migrations.AlterModelTable(
            name='familyvalue',
            table='masterfamilyvalue',
        ),
        migrations.AlterModelTable(
            name='height',
            table='masterheight',
        ),
        migrations.AlterModelTable(
            name='highesteducation',
            table='masterhighesteducation',
        ),
        migrations.AlterModelTable(
            name='lagnam',
            table='masterlagnam',
        ),
        migrations.AlterModelTable(
            name='maritalstatus',
            table='mastermaritalstatus',
        ),
        migrations.AlterModelTable(
            name='parentsoccupation',
            table='masterparentsoccupation',
        ),
        migrations.AlterModelTable(
            name='placeofbirth',
            table='masterplaceofbirth',
        ),
        migrations.AlterModelTable(
            name='profileholder',
            table='masterprofileholder',
        ),
        migrations.AlterModelTable(
            name='rasi',
            table='masterrasi',
        ),
        migrations.AlterModelTable(
            name='religion',
            table='masterreligion',
        ),
        migrations.AlterModelTable(
            name='state',
            table='masterstate',
        ),
        migrations.AlterModelTable(
            name='ugdegree',
            table='masterugdegree',
        ),
    ]
