<?php
// prénom attendu (en minuscules)
$prenomAutorise = 'barbara';

$erreur = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenomSaisi = strtolower(trim(isset($_POST['prenom']) ? $_POST['prenom'] : ''));

    if ($prenomSaisi === $prenomAutorise) {
        // redirection vers la page principale
        header('Location: index.php');
        exit;
    } else {
        $erreur = "CASSE TOI T'ES PAS MA FEMME !!!";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion secrète</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            min-height: 100vh;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: linear-gradient(135deg, #ffe4f1, #ffd6e8, #fff5f9);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 18px 40px rgba(255, 105, 180, 0.25);
            padding: 2.5rem 2rem;
            max-width: 380px;
            width: 90%;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .container::before, .container::after {
            content: "❤";
            position: absolute;
            font-size: 4rem;
            color: rgba(255, 105, 180, 0.15);
            animation: float 6s ease-in-out infinite;
        }
        .container::before {
            top: -20px;
            left: -10px;
        }
        .container::after {
            bottom: -20px;
            right: -10px;
            animation-delay: 2s;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        h1 {
            font-family: "Pacifico", "Brush Script MT", cursive;
            font-size: 1.9rem;
            color: #ff4f8b;
            margin-bottom: 0.75rem;
        }
        p.subtitle {
            font-size: 0.95rem;
            color: #a44a6f;
            margin-bottom: 1.8rem;
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        label {
            font-size: 0.9rem;
            color: #b0557a;
        }
        input[type="text"] {
            padding: 0.7rem 0.9rem;
            border-radius: 999px;
            border: 1px solid #ffc0d9;
            font-size: 1rem;
            outline: none;
            transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.1s;
        }
        input[type="text"]:focus {
            border-color: #ff7bab;
            box-shadow: 0 0 0 3px rgba(255, 123, 171, 0.25);
            transform: translateY(-1px);
        }
        button {
            margin-top: 0.2rem;
            padding: 0.75rem 1rem;
            border-radius: 999px;
            border: none;
            background: linear-gradient(135deg, #ff7bab, #ff4f8b);
            color: #fff;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(255, 105, 180, 0.4);
            transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        button:active {
            transform: translateY(1px);
            box-shadow: 0 6px 15px rgba(255, 105, 180, 0.3);
        }
        .hint {
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: #c06b8b;
            opacity: 0.85;
        }
        .error {
            margin-top: 0.75rem;
            font-size: 0.85rem;
            color: #c0392b;
        }
        @media (max-width: 480px) {
            .container {
                padding: 2rem 1.4rem;
            }
            h1 {
                font-size: 1.6rem;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <h1>On est déjà le 14 ? </h1>
    <p class="subtitle">Coucou toi ! Joyeuse Saint-Valentin 💌</p>

    <form method="post" autocomplete="off">
        <label for="prenom">Entre ton prénom pour continuer :</label>
        <input type="text" id="prenom" name="prenom" required>

        <button type="submit">Ouvrir la surprise</button>

        <?php if (!empty($erreur)): ?>
            <p class="hint">écris en minuscule</p>
            <p class="error"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
        <?php endif; ?>
    </form>
</div>
</body>
</html>