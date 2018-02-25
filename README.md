# 42 Campus
Website that allows 42 Silicon Valley students find each other on the map

To install the project you will need to have *Python 3* and *pip3* installed and follow these steps:
1. Clone this repository:
   ```bash
   git clone https://github.com/AlexEzzeddine/campus42.git campus
   cd campus
   ```
2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv --prompt campus env
   source env/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run a server:

   ```bash
   ./manage.py runserver
   ```


   or


   ```bash
   ./manage.py runserver -s 0:port
   ```
   
   
   where `0` is a shortcut for `0.0.0.0` to make your website publicly available and `port` is a desired port number


Now you can access the website at `localhost:8000`
