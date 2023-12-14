from django.shortcuts import redirect
from django.views.generic import CreateView
from .models import User


class UserCreateView(CreateView):
    model = User
    fields = ["username", "password", "email"]

    def form_valid(self, form):
        form.save()
        return redirect(to="/users")
