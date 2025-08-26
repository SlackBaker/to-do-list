from tortoise import fields, models

class Task(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=200)
    is_completed = fields.BooleanField(default=False)
    due_date = fields.DateField(null=True)
    priority = fields.IntField(default=1)
    category = fields.CharField(max_length=100, default="General")
