from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from .models import Projects
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django import forms

class ContactForm(forms.Form):
    from_email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Email','class': 'form-control'}), required=True)
    subject = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Subject', 'class': 'form-control'}), required=True)
    message = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control'}), required=True)

def index(request):
    projects = Projects.objects.all()
    return render(request, 'portfolio/index.html', {'projects': projects})

def contact(request):
    if request.method == "GET":
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data["subject"]
            from_email = form.cleaned_data["from_email"]
            message = form.cleaned_data['message']
            try:
                send_mail(subject, message, from_email, ["admin@example.com"])
            except BadHeaderError:
                return HttpResponse("Invalid header found.")
            # message success
            return HttpResponseRedirect("/contact", {"form": form, "message": "success"})
    return render(request, "portfolio/contact.html", {"form": form})



def about(request):
    return render(request, 'portfolio/about.html')

def projects(request):
    projects = Projects.objects.all()
    return render(request, 'portfolio/projects.html', {'projects': projects})
