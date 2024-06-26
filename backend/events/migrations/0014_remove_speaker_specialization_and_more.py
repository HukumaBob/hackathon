# Generated by Django 4.2.4 on 2024-05-29 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_user_first_name_alter_user_last_name_and_more'),
        ('events', '0013_alter_speaker_specialization'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='speaker',
            name='specialization',
        ),
        migrations.AddField(
            model_name='speaker',
            name='specializations',
            field=models.ManyToManyField(to='users.specialization'),
        ),
    ]
