curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

cd client
npm i
cd ../

cd server
npm i
cd ../

sudo apt install -y nginx
sudo ln -s /vagrant/deps/vetka-site.conf /etc/nginx/conf.d/vetka-site.conf
sudo rm /etc/nginx/sites-enabled/default
sudo service nginx restart

echo "LOCALE"
echo "Set vars for locales..."
export LC_ALL=en_US.UTF-8
export LC_LANG=en_US.UTF-8
export LANGUAGE=en

echo "Generate locales..."
sudo locale-gen en_US en_US.UTF-8 ru_RU.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8

sudo apt -y install postgresql
sudo cp deps/pg_hba.conf /etc/postgresql/9.5/main/
sudo service postgresql restart

