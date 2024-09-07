function checkLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Tentukan radius dan lokasi pusat
        var centerLat = -7.9456698; // Ganti dengan latitude pusat
        var centerLng = 112.6110842; // Ganti dengan longitude pusat
        var radius = 880; // Radius dalam meter

        // Hitung jarak antara lokasi pengguna dan pusat
        var distance = calculateDistance(userLat, userLng, centerLat, centerLng);

        var messageElement = document.getElementById('message');
        var titleElement = document.getElementById('title');
        
        if (distance <= radius) {
          document.getElementById('form-container').style.display = 'block'; // Tampilkan form jika dalam radius
          titleElement.textContent = 'Lokasi Sesuai!';
          messageElement.textContent = 'Lokasi anda: Masjid Raden Patah'
        } else {
          document.getElementById('message').textContent = 'Akses ke Google Form dibatasi untuk lokasi tertentu.';
        }
      }, function(error) {
        document.getElementById('message').textContent = 'Gagal mendapatkan lokasi. Pastikan lokasi diaktifkan.';
      });
    } else {
      document.getElementById('message').textContent = 'Geolocation tidak didukung oleh browser ini.';
    }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    var R = 6371000; // Radius bumi dalam meter
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

window.onload = checkLocation;