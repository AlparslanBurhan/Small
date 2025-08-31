export interface CardData {
    id: number;
    baslik: string;
    kisa_ozet: string;
    tum_metin: string;
    clap_sayisi: number;
    yazilma_tarihi: string;
}

export interface BlogPageParams {
    id: string;
}

export interface ClapState {
    clicked: boolean
    claps: number
    setClaps: (value: number) => void
    toggleClap: () => void
}

export interface ClapCounterProps {
    initialClaps: number
    blogId: number
}
