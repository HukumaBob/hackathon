# Generated by Django 4.2.4 on 2024-05-29 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0014_remove_speaker_specialization_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speaker',
            name='foto',
            field=models.ImageField(blank=True, null=True, upload_to='images/', verbose_name='Фото спикера'),
        ),
        migrations.AlterField(
            model_name='speaker',
            name='info',
            field=models.TextField(blank=True, max_length=500, verbose_name='Дополнительная информация'),
        ),
    ]
