document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.querySelector('button:nth-of-type(1)');
  const loadButton = document.querySelector('button:nth-of-type(2)');
  const promptDisplay = document.querySelector('p');

  saveButton.addEventListener('click', async () => {
    const prompt = prompt('Enter your prompt:');
    if (!prompt) return;

    const res = await fetch('https://promptvault.onrender.com/api/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: prompt })
    });

    if (res.ok) {
      alert('Prompt saved!');
    } else {
      alert('Failed to save prompt.');
    }
  });

  loadButton.addEventListener('click', async () => {
    const res = await fetch('https://promptvault.onrender.com/api/prompts');
    if (!res.ok) return promptDisplay.textContent = 'Error loading prompts.';

    const data = await res.json();
    if (data.length === 0) {
      promptDisplay.textContent = 'No prompts found.';
    } else {
      promptDisplay.textContent = data.map(p => `• ${p.text}`).join('\n');
    }
  });
});
