import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(
    page_title="AutoVModel — Automotive V Model Framework",
    page_icon="🚗",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to hide Streamlit default chrome & margins for clean full-screen experience
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding: 0rem !important;
            margin: 0rem !important;
            max-width: 100% !important;
        }
        iframe {
            border: none !important;
            width: 100% !important;
        }
    </style>
""", unsafe_allow_html=True)

def load_standalone_html():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()
    with open(os.path.join(base_dir, "styles.css"), "r", encoding="utf-8") as f:
        css = f.read()
    with open(os.path.join(base_dir, "extensions.css"), "r", encoding="utf-8") as f:
        ext_css = f.read()
    with open(os.path.join(base_dir, "app.js"), "r", encoding="utf-8") as f:
        js = f.read()
    with open(os.path.join(base_dir, "extensions.js"), "r", encoding="utf-8") as f:
        ext_js = f.read()

    # Bundle into single self-contained HTML for Streamlit iframe
    bundle = html.replace(
        '<link rel="stylesheet" href="styles.css" />',
        f'<style>\n{css}\n</style>'
    ).replace(
        '<link rel="stylesheet" href="extensions.css" />',
        f'<style>\n{ext_css}\n</style>'
    ).replace(
        '<script src="app.js"></script>',
        f'<script>\n{js}\n</script>'
    ).replace(
        '<script src="extensions.js"></script>',
        f'<script>\n{ext_js}\n</script>'
    )
    return bundle

html_bundle = load_standalone_html()
components.html(html_bundle, height=1000, scrolling=True)
