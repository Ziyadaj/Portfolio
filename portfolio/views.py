from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from .models import Projects
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django import forms

class ContactForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'someone@example.com','class': 'form-control'}), required=True)
    subject = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), required=True)
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
            from_email = form.cleaned_data["email"]
            message = form.cleaned_data['message']
            print(subject, from_email, message)
            print(settings.EMAIL_HOST_USER)
            try:
                send_mail(subject + ' FROM: ' + from_email, message, from_email,  [settings.EMAIL_HOST_USER], fail_silently=False)
            except BadHeaderError:
                return HttpResponse("Invalid header found.")
            # message success
            return render(request, "portfolio/contact.html", {"form": form, "message": "Email sent successfully!"})
    return render(request, "portfolio/contact.html", {"form": form})



def about(request):
    return render(request, 'portfolio/about.html')

def projects(request):
    projects = Projects.objects.all()
    return render(request, 'portfolio/projects.html', {'projects': projects})
