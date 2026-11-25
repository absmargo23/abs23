const STORAGE_KEY = 'affilmate-campaigns-v1';
const form = document.querySelector('#campaign-form');
const output = document.querySelector('#campaign-output');
const emptyState = document.querySelector('#empty-state');
const draftCount = document.querySelector('#draft-count');

function loadCampaigns() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCampaigns(campaigns) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns.slice(0, 10)));
  } catch {
    showToast('Draft dibuat, tetapi tidak dapat disimpan di browser ini.');
  }
}

function categoryAngle(category) {
  const angles = {
    fashion: 'tunjukkan detail bahan, tampilan saat dipakai, dan cara memadukannya',
    rumah: 'perlihatkan produk digunakan dalam rutinitas rumah sehari-hari',
    elektronik: 'demonstrasikan fitur yang benar-benar tersedia dan manfaat praktisnya',
    makanan: 'ceritakan rasa atau pengalaman konsumsi yang memang sudah kamu coba',
    'ibu-anak': 'angkat kemudahan penggunaan dan pengalaman nyata orang tua',
    umum: 'hubungkan fungsi produk dengan kebutuhan sehari-hari audiens'
  };
  return angles[category] || angles.umum;
}

function createCampaign(data) {
  const audience = data.audience || 'orang yang mencari solusi praktis';
  const angle = categoryAngle(data.category);
  const notes = data.notes ? ` Keunggulan terverifikasi untuk disorot: ${data.notes}` : '';
  const priceLine = data.price ? ` Harga yang kamu masukkan: Rp${Number(data.price).toLocaleString('id-ID')}. Verifikasi harga terbaru sebelum posting.` : 'Cek harga dan promo terbaru sebelum posting.';
  const commissionLine = data.commission ? ` Komisi input: ${data.commission}% (cek kembali syarat program yang berlaku).` : '';
  return {
    product: data.product,
    createdAt: new Date().toISOString(),
    angle: `Untuk ${audience}, ${angle}.${notes}`,
    hook: `Lagi cari ${data.product}? Ini beberapa hal yang sebaiknya kamu cek sebelum memilih.`,
    script: `HOOK (0–3 detik): “Lagi cari ${data.product}?”\nISI (3–15 detik): Tunjukkan produk dan jelaskan keunggulan yang bisa dibuktikan. ${data.notes || 'Cocokkan fitur di halaman produk dengan kebutuhanmu.'}\nCTA (15–20 detik): “Cek detail dan harga terbaru melalui tautan affiliate di bio/keranjang.”\n\nCatatan: Ceritakan pengalaman pribadi secara jujur. Jangan menyampaikan klaim yang belum diverifikasi.`,
    caption: `${data.product}: ${angle}. ${priceLine}${commissionLine}\n\nTautan affiliate: [tempel tautanmu]\nDisclosure: Saya dapat menerima komisi jika kamu membeli melalui tautan ini. Pastikan disclosure sesuai aturan platform dan ketentuan yang berlaku.`,
    checklist: '1. Periksa stok, harga, variasi, dan promo terbaru.\n2. Verifikasi setiap klaim dengan halaman produk atau pengalaman nyata.\n3. Tambahkan tautan affiliate dan disclosure yang jelas.\n4. Catat performa klik dan pesanan setelah konten tayang.'
  };
}

function appendTextCard(label, value, campaignIndex, cardIndex) {
  const card = document.createElement('section');
  card.className = 'output-card';
  const heading = document.createElement('div');
  heading.className = 'output-label';
  heading.textContent = label;
  const body = document.createElement('p');
  body.textContent = value;
  const copy = document.createElement('button');
  copy.className = 'copy-button';
  copy.type = 'button';
  copy.textContent = 'Salin';
  copy.addEventListener('click', () => copyText(value));
  card.append(heading, body, copy);
  output.append(card);
}

function renderCampaigns() {
  const campaigns = loadCampaigns();
  output.replaceChildren();
  emptyState.hidden = campaigns.length > 0;
  draftCount.textContent = `${campaigns.length} draft`;
  campaigns.forEach((campaign, index) => {
    const title = document.createElement('h3');
    title.textContent = `✳ ${campaign.product}`;
    const wrapper = document.createElement('section');
    wrapper.className = 'output-card';
    wrapper.append(title);
    output.append(wrapper);
    appendTextCard('ANGLE KAMPANYE · CAMPAIGN STRATEGIST', campaign.angle, index, 0);
    appendTextCard('HOOK VIDEO · CONTENT CREATOR', campaign.hook, index, 1);
    appendTextCard('DRAFT NASKAH · CONTENT CREATOR', campaign.script, index, 2);
    appendTextCard('CAPTION & CTA', campaign.caption, index, 3);
    appendTextCard('CHECKLIST · PERFORMANCE ANALYST', campaign.checklist, index, 4);
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Teks berhasil disalin.');
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    document.execCommand('copy');
    field.remove();
    showToast('Teks berhasil disalin.');
  }
}

let toastTimer;
function showToast(message) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  document.body.append(toast);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.remove(), 2600);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const campaign = createCampaign({
    product: String(values.get('product') || '').trim(),
    category: String(values.get('category') || 'umum'),
    price: String(values.get('price') || '').trim(),
    commission: String(values.get('commission') || '').trim(),
    audience: String(values.get('audience') || '').trim(),
    notes: String(values.get('notes') || '').trim()
  });
  const campaigns = [campaign, ...loadCampaigns()].slice(0, 5);
  saveCampaigns(campaigns);
  renderCampaigns();
  showToast('Draft kampanye berhasil dibuat. Silakan tinjau sebelum dipublikasikan.');
});

renderCampaigns();
