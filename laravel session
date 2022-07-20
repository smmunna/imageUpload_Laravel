Controller
======================
//Login in Form
    public function CheckData(Request $request)
    {
        $data = $request->all();
        $request->session()->put('email',$data['email']);
        $mymail =  session('email');
        return view('donor_dashboard');
    }
  =====================  
  Routing 
  =====================
  Route::get('/sign-in', function () {
    if(session()->has('email'))
    {
        return view('donor_dashboard');
    }
    return view('login');
});
  Route::get('/logout', function () {
    if(session()->has('email'))
    {
        session()->pull('email');
    }
    return view('login');
});

===============
view
===============
                <div class="col-lg-5">
                    Hello, Dear {{session('email')}}
                    <a href="/logout">Logout</a>
                </div>
