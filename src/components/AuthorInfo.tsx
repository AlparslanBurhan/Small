import Image from 'next/image';

export default function AuthorInfo() {
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full max-w-5xl px-4 py-6 text-white rounded-lg text-center bg-gradient-to-r from-blue-900 to-gray-700">
        <Image
          src="/avatar.png"
          alt="Yazar Avatarı"
          width={100}
          height={100}
          className="mx-auto rounded-full mb-4 border-2 border-gray-600"
        />
        <h2 className="text-xl font-semibold">Alparslan Burhan</h2>
        <p className="text-gray-400 mt-2">
          Merhaba! Web geliştirme ve yazılım dünyasında tutkuyla çalışan biriyim. Şu anda Next.js ile projeler geliştiriyorum.
        </p>
      </div>
    </div>
  );
}
