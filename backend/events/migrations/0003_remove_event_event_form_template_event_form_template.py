# Generated by Django 4.2.4 on 2024-04-13 12:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_formtemplate_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='event_form_template',
        ),
        migrations.AddField(
            model_name='event',
            name='form_template',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_event', to='events.formtemplate'),
        ),
    ]
