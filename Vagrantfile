# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |main|
  # https://docs.vagrantup.com.
  main.ssh.username = "vagrant"
  main.ssh.private_key_path = ["~/.vagrant.d/insecure_private_key"]
  main.ssh.insert_key = false

  main.vm.box = "ubuntu/xenial64"
  main.vm.provider "virtualbox" do |vb|
    vb.name = "vetka"
    vb.cpus = 2
    vb.memory = 2048
  end

  # main.vm.provision "shell", run: "always", inline: "sudo service nginx restart"

  main.vm.network "forwarded_port", guest: 22, host: 9922, id: "ssh"
  main.vm.network "forwarded_port", guest: 5985, host: 5985, id: "wec"
  main.vm.network "private_network", ip: "19.19.19.19"
  # main.vm.network "forwarded_port", guest: 80, host: 10023, id: "apache"
end
