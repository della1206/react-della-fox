function ProfileImage() {
    return (
        <div className="profile-img">
            <img src="/img/user.JPG" alt="profile" />
        </div>
    )
}

function HeaderNama({ nama, username, bio }) {
    return (
        <div className="header-text">
            <h2>{nama}</h2>

            {/* Username (skill) */}
            <p className="username">{username}</p>

            {/* Bio */}
            <p className="bio">{bio}</p>
        </div>
    )
}

function CardItem({ title, isi }) {
    return (
        <div className="card-item">
            <h4>{title}</h4>
            <p>{isi}</p>
        </div>
    )
}

export default function BiodataDiri() {
    return (
        <div className="portofolio-card">
            <ProfileImage />
            <HeaderNama 
                nama="Della Marcelina Br Sembiring"
                username="HTML, CSS, JavaScript, UI/UX"
                bio="Saya adalah mahasiswa program studi Sistem Informasi yang bersemangat dalam dunia teknologi, khususnya pengembangan web. 
                Saya senang menciptakan tampilan yang menarik, interaktif, dan mudah digunakan serta terus belajar hal baru di dunia digital."
            />
            <hr />
            <CardItem 
                title="🎓 Pendidikan" 
                isi="Mahasiswa Sistem Informasi di perguruan tinggi Swasta Politeknik Caltex Riau." 
            />
            <CardItem 
                title="💼 Keahlian" 
                isi="Membuat website sederhana menggunakan HTML, CSS, serta beberapa project UI/UX design yang menarik dan interaktif." 
            />
            <CardItem 
                title="📞 Kontak" 
                isi="📧 della@email.com | 📱 Instagram: @dellamrcl_ | 💬 WhatsApp: 081265719003" 
            />
        </div>
    )
}