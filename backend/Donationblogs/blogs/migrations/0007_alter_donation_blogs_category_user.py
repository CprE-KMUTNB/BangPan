# Generated by Django 4.1.2 on 2022-11-27 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0006_alter_donation_blogs_category_object'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donation_blogs',
            name='category_user',
            field=models.CharField(choices=[('เด็กเล็ก', 'Kid'), ('เด็กโต', 'Teenager'), ('ผู้ใหญ่', 'Adult'), ('คนชรา', 'Graybeard'), ('คนพิการ', 'Cripple')], default='เด็กเล็ก', max_length=50),
        ),
    ]
