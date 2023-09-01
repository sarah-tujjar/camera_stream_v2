from django.shortcuts import redirect
from functools import wraps

def login_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        print("Checking login status...")
        if not request.session.get('user_id'):
            print("User not logged in. Redirecting to signin page.")
            return redirect('signin')  # Redirect to signin page if not logged in
        return view_func(request, *args, **kwargs)
    return _wrapped_view
