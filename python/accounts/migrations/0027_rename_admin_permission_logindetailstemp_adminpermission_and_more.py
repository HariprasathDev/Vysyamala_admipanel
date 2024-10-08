# Generated by Django 5.0.6 on 2024-06-20 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0026_rename_profile_for_logindetailstemp_profile_for_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='admin_permission',
            new_name='AdminPermission',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='email_id',
            new_name='EmailId',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='gender',
            new_name='Gender',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='login_id',
            new_name='LoginId',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='mobile_no',
            new_name='Mobile_no',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='otp',
            new_name='Otp',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='password',
            new_name='Password',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='payment',
            new_name='Payment',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='payment_expire',
            new_name='PaymentExpire',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='payment_type',
            new_name='PaymentType',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_for',
            new_name='ProfileId',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_complexion',
            new_name='Profile_complexion',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_dob',
            new_name='Profile_dob',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_id',
            new_name='Profile_for',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_height',
            new_name='Profile_height',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_marital_status',
            new_name='Profile_marital_status',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='profile_name',
            new_name='Profile_name',
        ),
        migrations.RenameField(
            model_name='logindetailstemp',
            old_name='stage',
            new_name='Stage',
        ),
        migrations.RemoveField(
            model_name='logindetailstemp',
            name='id',
        ),
        migrations.AddField(
            model_name='logindetailstemp',
            name='ContentId',
            field=models.AutoField(default=0, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
