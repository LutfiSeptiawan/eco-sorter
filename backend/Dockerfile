FROM php:8.1-cli

# 1. Install ekstensi MySQLi untuk database
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# 2. Salin seluruh file PHP ke dalam server
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

# 3. Jalankan server bawaan PHP menggunakan port dinamis dari Railway ($PORT)
CMD ["sh", "-c", "php -S 0.0.0.0:$PORT"]