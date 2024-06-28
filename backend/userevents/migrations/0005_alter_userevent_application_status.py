# Generated by Django 4.2.4 on 2024-04-13 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userevents', '0004_alter_userevent_application_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userevent',
            name='application_status',
            field=models.CharField(choices=[('is_favorite', 'Не подана'), ('pending', 'На рассмотрении'), ('approved', 'Одобрена'), ('rejected', 'Отклонена')], default='is_favorite', max_length=20),
        ),
    ]
