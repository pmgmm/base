<?php
/**
 * FRAMEWORK - TEMPLATES - PDF - A
 * 
 *      SECÇÕES TABELA
 *          SUB-SECÇÕES TABELA
 *          SUB-SECÇÕES IMAGENS
 *      SECÇÕES IMAGENS
 *      ASSINATURA
 * 
 * ATENÇÃO: Utiliza a constante global: CORE_TMP_PDF_PATH 
 * 
 * @pmonteiro (2020-03-02)
 */ 

namespace FWK\templates\pdf;

use  \FWK\traits as traits;


final class A0 extends \TCPDF implements  \FWK\interfaces\pdf\TemplateTypeAInterface {

    use traits\throwableHandler;

    // ======================================================== CONFIGURATION

    // -------------------------------------------------------- DOCUMENT

    private int $cfg_document_margin_left = 10; // Margem esquerda do documento
    private int $cfg_document_margin_right = 10; // Margem direita do documento
    private string $cfg_document_orientation = 'P'; // Orientação
    private string $cfg_document_format ='A4'; // Formato
    private bool $cfg_document_archive = false; // PDF/A-1b mode

    // -------------------------------------------------------- HEADER

    private array $cfg_header_title_color = array(0,0,0); // Cor do título
    private array $cfg_header_title_font = array('DejaVuSansCondensed', 'B', 10); // Fonte do título
    private array $cfg_header_sub_title_color = array(0,0,0); // Cor do sub-título
    private array $cfg_header_sub_title_font = array('DejaVuSansCondensed', 'B', 9); // Fonte do sub-título
    private int $cfg_header_title_line_height = 6; // Alturas das linhas do título e sub-título
    private string $cfg_header_logo_file_path = CORE_RESOURCES_PATH . 'pdf/header_logo_navia.png'; // Logo por defeito
    private int $cfg_header_logo_desired_width = 50; // Comprimento desejado do logo
    private int $cfg_header_logo_desired_height = 15; // Altura desejada do logo
    private int $cfg_header_size = 28; //  Altura

    // -------------------------------------------------------- FOOTER

    private float $cfg_footer_line_thickness = 0.1; // Espessura do linha divisória
    private array $cfg_footer_line_color = array(0,0,0); // Cor do linha divisória
    private string $cfg_footer_info = 'Processado por NAVIA em {date}'; // Informação 
    private array $cfg_footer_info_color = array(0,0,0); // Cor da informação
    private array $cfg_footer_info_font = array('DejaVuSansCondensed', '', 7); // Fonte da informação
    private array $cfg_footer_company_color = array(100,100,100); // Cor da companhia
    private array $cfg_footer_company_font = array('DejaVuSansCondensed', '', 6.5); // Fonte da companhia
    private int $cfg_footer_text_line_height = 5; // Altura das linhas informação e companhia
    private int $cfg_footer_size = 20; // Altura

    // -------------------------------------------------------- SECTION
    
    private int $cfg_section_space_before = 4; // Espaço anterior à secção
    private array $cfg_section_title_color = array(0,0,0); // Cor do título
    private array $cfg_section_title_font = array('DejaVuSansCondensed', 'B', 8); // Fonte do título
    private int $cfg_section_title_line_height = 6; // Altura da linha do título
    private string $cfg_section_title_continuation_file_path = FRAMEWORK_RESOURCES_PATH . 'pdf/section_continuation.jpg'; // Icone de continuação de secção
    private float $cfg_section_title_line_thickness = 0.1; // Espessura da linha divisória após título
    private int $cfg_section_title_space_after = 1; // Espaço após título
    private int $cfg_section_body_must_fit_lines = 3; // Linhas que devem caber na página antes da quebra
    private array $cfg_section_body_color = array(0,0,0); // Cor do texto das linhas
    private array $cfg_section_body_font = array('DejaVuSansCondensed', '', 8); // Fonte do texto das linhas
    private int $cfg_section_body_line_height = 5; // Altura base de linha 
    private array $cfg_section_body_zebra_odd_color = array(252, 252, 252); // Cor do fundo das linhas impar
    private array $cfg_section_body_zebra_pair_color = array(242, 242, 242); // Cor do fundo das linhas par
    private int $cfg_section_body_columns_gap = 1; // Espaço de separação entre colunas
    
    // -------------------------------------------------------- SUB SECTION

    private int $cfg_sub_section_space_before; // Espaço anterior à sub-secção
    private int $cfg_sub_section_isolated_space_before; // Espaço anterior à sub-secção (isolada)
    private int $cfg_sub_section_columns_gap; // Espaço de separação entre colunas
    private array $cfg_sub_section_title_backcolor; // Cor do fundo do título
    private array $cfg_sub_section_title_color; // Cor do título
    private array $cfg_sub_section_title_font; // Fonte do título
    private int $cfg_sub_section_title_line_height; // Altura da linha do título
    private int $cfg_sub_section_title_space_after; // Espaço posterior ao título
    private int $cfg_sub_section_body_must_fit_lines; // Linhas que devem caber na página antes da quebra
    private array $cfg_sub_section_body_color; // Cor do texto das linhas
    private array $cfg_sub_section_body_font; // Fonte do texto das linhas
    private int $cfg_sub_section_body_line_height; // Altura base da linha
    private array $cfg_sub_section_body_zebra_odd_color; // Cor do fundo das linhas impar
    private array $cfg_sub_section_body_zebra_pair_color; // Cor do fundo das linhas par

    // Default style 
    private array $cfg_sub_section_s0 = array(
        'space_before' => 1, 
        'isolated_space_before' => 5,
        'columns_gap' => 1,
        'title_backcolor' => array(220,220,220),
        'title_color' => array(0,0,0),
        'title_font' => array('DejaVuSansCondensed', 'B', 8),
        'title_line_height' => 5,
        'title_space_after' => 0,
        'body_must_fit_lines' => 3,
        'body_color' => array(0,0,0),
        'body_font' => array('DejaVuSansCondensed', '', 8),
        'body_line_height' => 5,
        'body_zebra_odd_color' => array(252, 252, 252),
        'body_zebra_pair_color' => array(242, 242, 242)
        );

    // Style 1
    private array $cfg_sub_section_s1 = array(
                                    'title_backcolor' => array(184, 212, 178),
                                    'body_zebra_pair_color' => array(223, 238, 218)
                                    );

    // Style 2
    private array $cfg_sub_section_s2 = array(
                                    'title_backcolor' => array(191, 209, 229),
                                    'body_zebra_pair_color' => array(217, 229, 240)
                                    );

 
    // -------------------------------------------------------- BLOCK IMAGES
                              
    private int $cfg_block_images_space_before = 1; // Espaço anterior ao bloco
    private int $cfg_block_images_image_max_side = 75; // Tamanho máximo para o lado maior das imagens
    private int $cfg_block_images_gap = 5; // Espaço de separação entre imagens
    
 
    // -------------------------------------------------------- SIGNATURE

    private int $cfg_signature_space_before = 20; // Espaço anterior à assinatura
    private array $cfg_signature_title_font = array('DejaVuSansCondensed', 'B', 8); // Fonte do título
    private array $cfg_signature_title_color = array(0,0,0); // Cor do título
    private int $cfg_signature_title_line_height = 6; // Altura da linha do título
    private string $cfg_signature_title = 'Assinatura:'; // Título
    private array $cfg_signature_name_font = array('DejaVuSansCondensed', '', 7); // Fonte do nome
    private array $cfg_signature_name_color = array(100,100,100); // Cor do nome
    private int $cfg_signature_name_line_height = 6; // Altura da linha do nome
    private int $cfg_signature_desired_width = 60; // Comprimento desejado da assinatura
    private int $cfg_signature_desired_height = 16; // Altura desejada da assinatura
    private int $cfg_signature_line_width = 70; // Comprimento da linha base 
    private float $cfg_signature_line_thickness = 0.1; // Espessura da linha base 
    private int $cfg_signature_space_after = 10;//  Espaço posterior à assinatura


    // Constants

    // Tipos de Blocos
    private const SECTION = 1;
    private const SUB_SECTION = 2;
    private const SECTION_IMAGES = 3;
    private const SUB_SECTION_IMAGES = 4;
    

    //  Work  
    private int $current_sub_section_style;
    private bool $current_sub_section_isolated;
    private array $current_zebra_odd_color;
    private array $current_zebra_pair_color;
    private bool $current_zebra_odd = true; 
    private string $current_section_title; 
    private array $current_sub_section_titles;
    private array $current_values;
    private array $current_column_widths;
    private array $current_column_aligns;
    private int $current_line_height;
    private string $current_header_title;
    private string $current_header_logo_file_path;
    private string $current_header_sub_title;
    private string $current_signature_file_path;
    private string $current_signature_name;
    private float $current_document_available_width;
    private array $current_output = array();
    private bool $empty_page = true;
    private bool $write_signature = false;
    private array $contents = array();
    private $last_content_index = 0;
    

    // Instâcia de TCPDF para cálculo de "alturas"
    private \TCPDF $ghost_pdf;
    

    /**
     * Contructor
     * Setup de TCPDF segundo configuração
     *
     * @param string|null $target = Switch para repositórios secundários
     * 
     * @pmonteiro (2020-03-02)
     */    
    public function __construct() {
        try {

            // Contante pasta de cache do tcpdf
            if (!defined('K_PATH_CACHE')) {
                define('K_PATH_CACHE', CORE_TMP_PDF_PATH. 'tcpdf/');
            }
            
            // Criação de instância
            parent::__construct($this->cfg_document_orientation, 'mm', $this->cfg_document_format, 
                                true, 'UTF-8', false, $this->cfg_document_archive);
    
            // Margens esquerda e direita                           
            $this->SetMargins($this->cfg_document_margin_left, 0, $this->cfg_document_margin_right);

            // Comprimento (width) útil
            $this->current_document_available_width = $this->getPageWidth() - ($this->cfg_document_margin_left +  $this->cfg_document_margin_right);

            // Margens Topo e cabeçalho
            $this->setHeaderMargin($this->cfg_header_size);
            $this->setTopMargin($this->cfg_header_size);

            // Logo default para cabeçalho
            $this->current_header_logo_file_path = $this->cfg_header_logo_file_path;

            // Margem rodapé
            $this->setFooterMargin($this->cfg_footer_size);

            // Infomações de rodapé
            $this->cfg_footer_info = str_replace('{date}', date('Y-m-d H:i:s'), $this->cfg_footer_info);
            
            // Desactivar automatismo de quebra de página 
            $this->SetAutoPageBreak(false);

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ======================================================== ATRIBUÍÇÃO DE CONTEÚDOS


    /**
     * Define logo para cabeçalho
     *
     * @param string $file_path = Ficheiro de logo
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */  
    public function tplSetHeaderLogo(string $file_path): void {
        try {

            $this->current_header_logo_file_path = $file_path;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define título para cabeçalho
     *
     * @param string $value = Título
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */  
    public function tplSetHeaderTitle(string $value): void {
        try {

        $this->current_header_title = $value;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define sub-título para cabeçalho
     *
     * @param string $value = Sub-título
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */  
    public function tplSetHeaderSubTitle(string $value): void {
        try {

            $this->current_header_sub_title = $value;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define assinatura e respectivo nome para documento
     *
     * @param string $file_path = Ficheiro de assinatura
     * @param string $name = Nome
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */ 
    public function tplSetSignature(string $file_path, $name = ''): void {
        try {

        $this->current_signature_file_path = $file_path;
        $this->current_signature_name = $name;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define informação de empresa para rodapé
     *
     * @param string $value = Informação de empresa
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */ 
    public function tplSetFooterCompany(string $value): void {
        try {

            $this->current_footer_company = $value;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define tipo de output pretendido para o documento
     * $download = true, faz download imediato (não grava)
     * Sem parâmetros, output para browser
     * 
     * Nos casos aplicáveis, devolve a file_path do ficheiro gravado
     * 
     * @param bool $download = ? Download imediato
     * @param string|null $file_name = Nome do ficheiro a gravar
     * @param string|null $folder_path = Pasta destino do ficheiro a gravar
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */ 
    public function tplSetOutput(bool $download, ?string $file_name = null, ?string $folder_path = null): void {
        try {

            $this->current_output['file_name'] = $file_name;
            $this->current_output['download'] = $download;
            $this->current_output['folder_path'] = $folder_path;

            if (!$download) {
                if (!isset($file_name)) {
                    $this->current_output['file_name'] = date('YmdHms_') . uniqid() . '.pdf';
                }
                if (isset($folder_path)) {
                    $this->current_output['file_path'] = $folder_path . $this->current_output['file_name'];
                } else {
                    $this->current_output['file_path'] = CORE_TMP_PDF_PATH . $this->current_output['file_name'];
                }
            } elseif(!isset($file_name) || empty($file_name)) {
                $this->current_output['file_name'] = 'tmp.pdf';

            }
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ======================================================== PROCESSAMENTO

    /*
     * Processa o template
     *
     * @return string = File path do ficheiro gravado (se for o caso)
     * 
     * @pmonteiro (2020-03-02)
     */
    public function tplProcess(): string {
        try {
            $result = '';

            // Cria instância "ghost" TCPDF
            $this->ghost_pdf = new \TCPDF();
            $this->ghost_pdf->addPage();

            // Adiciona a primeira página ao documento
            $this->customAddPage();

            // Para cada conteúdo adicionado ao template
            foreach ($this->contents as $key => $content) {

                // Se vai "escrever" o último conteúdo, tem de ter em consideração a assinatura (se existir)
                if ($key == $this->last_content_index && isset($this->current_signature_file_path)) {
                    $this->write_signature = true;
                }

                // Adiciona o conteúdo ao documento
                switch ($content->type) {
                    case self::SECTION:
                        $this->writeSection($content->title, $content->values, $content->column_widths);
                        break;
                    case self::SUB_SECTION:
                        $this->writeSubSectionTable($content->titles, $content->values, $content->column_widths, $content->column_aligns, $content->isolated, $content->style);
                        break;
                    case self::SECTION_IMAGES:
                        $this->writeSectionImages($content->title, $content->values, $content->columns);
                        break;
                    case self::SUB_SECTION_IMAGES:
                        $this->writeSubSectionImages($content->title, $content->values, $content->columns, $content->style);
                        break;
                }

            }
            
            // Se está ativa a adição da assinatura, executa-a
            if ($this->write_signature) {
                $this->writeSignature();
            }


            // Processa o output do documento 
            if (isset($this->current_output['file_name'])) {
                // Download imediato
                if ($this->current_output['download']) {
                    $this->Output($this->current_output['file_name'], 'D');
                } else {
                    // Para ficheiro
                    $this->Output($this->current_output['file_path'], 'F');
                }
                $result = $this->current_output['file_path'];
            } else {
                // Para browser
                $this->Output();
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona conteúdo do tipo secção ao template
     *
     * @param string $title = Título da secção
     * @param array $values = Valores para secção : array(array('nome', 'valor), ...)
     * @param array $column_widths = Tamanho (width) das colunas em percentagem decimal : array(0.03, 0.25, ...)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    public function tplAddSection(string $title, array $values = array(), array $column_widths = array()): void {
        try {
            // Só adiciona o conteúdo se tiver valores
            if (count($values)) {
                $content = new \stdClass();
                $content->type = self::SECTION;
                $content->title = $title;
                $content->values = $values;
                $content->column_widths = $column_widths;
                $this->last_content_index = count($this->contents);
                $this->contents[] = $content;
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

   
    /**
     * Adiciona conteúdo do tipo sub-secção tabela ao template
     *      A tabela pode ser isolada ou não da secção
     *
     * @param array $titles = Títulos da tabela : array('title', 'title', ...)
     * @param array $values = Valores para tabela : array(array('value, value, ...), ...)
     * @param array $column_widths = Tamanho (width) das colunas em percentagem decimal : array(0.50, 0.25, ...)
     * @param array $column_aligns = Alinhamento da coluna : array ('L', 'C', 'R', ...)
     * @param bool isolated = ? Isolado
     * @param int|null $style = Style da sub-secção (constante)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    public function tplAddSubSectionTable(array $titles, array $values, array $column_widths, array $column_aligns, bool $isolated = false, ?int $style = null): void {
        try {

            $content = new \stdClass();
            $content->type = self::SUB_SECTION;
            $content->titles = $titles;
            $content->values = $values;
            $content->column_widths = $column_widths;
            $content->column_aligns = $column_aligns;
            $content->isolated = $isolated;
            $content->style = $style;
            if (count($values)) {
                $this->last_content_index = count($this->contents);
                $this->contents[] = $content;
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


     /**
     * Adiciona conteúdo do tipo secção de imagens ao template
     *
     * @param string $title = Título da secção
     * @param array $values = Imagens : array(array('image_path', rotation), ...)
     * @param int $columns = Número de imagens por linha
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    public function tplAddSectionImages(string $title, array $values, int $columns): void {
        try {

            // Só adiciona o conteúdo se tiver imagens
            if (count($values)) {
                $content = new \stdClass();
                $content->type = self::SECTION_IMAGES;
                $content->title = $title;
                $content->values = $values;
                $content->columns = $columns;
                $this->last_content_index = count($this->contents);
                $this->contents[] = $content;
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

        
    /**
     *  Adiciona conteúdo do tipo sub-secção de imagens ao template
     *
     * @param string $title = Título da sub-secção
     * @param array $values = Imagens : array(array('image_path', rotation), ...)
     * @param int $columns = Número de imagens por linha
     * @param int|null $style = Estilo de sub-secção (null = anetrior ou default) 
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    public function tplAddSubSectionImages(string $title, array $values, int $columns, ?int $style = null): void {
        try {
            
            // Só adiciona o conteúdo se tiver imagens
            if (count($values)) {
                $content = new \stdClass();
                $content->type = self::SUB_SECTION_IMAGES;
                $content->title = $title;
                $content->values = $values;
                $content->columns = $columns;
                $content->style = $style;
                $this->last_content_index = count($this->contents);
                $this->contents[] = $content;
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
	 * Adiciona cabecalho às páginas do documento
     * 
     * ATENÇÃO: OVERRIDE
     *  
     * @return void
     * 
     * @pmonteiro (2020-03-02)
	 */
	protected function Header(): void {
        try {

             // Posiciona o início do cabecalho    
            $this->SetY($this->cfg_header_size - 18);
            
            // Valida se o ficheiro do logo existe
            if (isset($this->current_header_logo_file_path) && file_exists($this->current_header_logo_file_path)) {

                // Prepara a imagem
                $image_prepared = $this->prepareImage($this->current_header_logo_file_path, 0, $this->cfg_header_logo_desired_width, $this->cfg_header_logo_desired_height, false);
                
                // Adiciona a imagem
                $this->Image($image_prepared['file_path'], '', '', $image_prepared['width'], $image_prepared['height']);

                // Margem para título após a inserção do logo
                $title_margin_left = $this->cfg_document_margin_left + $image_prepared['width'] + 3;
                // Espaço disponível para título após a inserção do logo
                $title_available_width = $this->current_document_available_width + $this->cfg_document_margin_left - $title_margin_left;

            } else { // Settings para título sem inserção de logo

                // Margem para título
                $title_margin_left = $this->cfg_document_margin_left;
                // Espaço disponível para titulo
                $title_available_width = $this->current_document_available_width;

            }

            // Title
            $this->SetFont($this->cfg_header_title_font[0], $this->cfg_header_title_font[1], $this->cfg_header_title_font[2]);
            $this->SetTextColor($this->cfg_header_title_color[0], $this->cfg_header_title_color[1], $this->cfg_header_title_color[2]);
            $this->SetX($title_margin_left);
            $this->Cell($title_available_width, $this->cfg_header_title_line_height , $this->current_header_title, 0, 1, 'C');
            
            // Sub-Title
            $this->SetFont($this->cfg_header_sub_title_font[0], $this->cfg_header_sub_title_font[1], $this->cfg_header_sub_title_font[2]);
            $this->SetTextColor($this->cfg_header_sub_title_color[0], $this->cfg_header_sub_title_color[1], $this->cfg_header_sub_title_color[2]);
            $this->SetX($title_margin_left);
            $this->Cell($title_available_width, $this->cfg_header_title_line_height, $this->current_header_sub_title, 0, 1, 'C');
    
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
	 * Adiciona rodapé às páginas do documento
     * 
     * ATENÇÃO: OVERRIDE
     *  
     * @return void
     * 
     * @pmonteiro (2020-03-02)
	 */
    protected function Footer(): void {
        try {

            // Posiciona o início do rodapé    
            $this->SetY((-1 * $this->cfg_footer_size) + 4);

            // Atribui a cor da linha
            $this->SetDrawColor($this->cfg_footer_line_color[0], $this->cfg_footer_line_color[1], $this->cfg_footer_line_color[2]);

            // Adiciona a linha
            $this->Line($this->cfg_document_margin_left, $this->getY(), $this->cfg_document_margin_left + $this->current_document_available_width, $this->getY(), array('width' => $this->cfg_footer_line_thickness));

            // Adiciona espaço após linha
            $this->SetY($this->getY() + 0.5);

            // Info + Page number
            $this->SetFont($this->cfg_footer_info_font[0], $this->cfg_footer_info_font[1], $this->cfg_footer_info_font[2]);
            $this->SetTextColor($this->cfg_footer_info_color[0], $this->cfg_footer_info_color[1], $this->cfg_footer_info_color[2]);
            $this->MultiCell($this->current_document_available_width * 0.75, $this->cfg_footer_text_line_height, $this->cfg_footer_info, 0, 'L', 0, 0);
            $this->MultiCell(($this->current_document_available_width * 0.25) + 17, $this->cfg_footer_text_line_height, 'Página ' . $this->getAliasNumPage().' de '.$this->getAliasNbPages(), 0, 'R', 0, 1); 

            // Company
            $this->SetFont($this->cfg_footer_company_font[0], $this->cfg_footer_company_font[1], $this->cfg_footer_company_font[2]);
            $this->SetTextColor($this->cfg_footer_company_color[0], $this->cfg_footer_company_color[1], $this->cfg_footer_company_color[2]);
            $this->Cell($this->current_document_available_width, $this->cfg_footer_text_line_height, $this->current_footer_company, 0, 1, 'C');

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // -------------------------------------------------------- SECTION


    /**
     * Adiciona secção ao documento
     *
     * @param string $title = Título da secção
     * @param array $values = Valores para secção : array(array('nome', 'valor), ...)
     * @param array $column_widths = Tamanho (width) das colunas em percentagem decimal : array(0.03, 0.25, ...)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSection(string $title, array $values, array $column_widths): void {
        try {

            // Propriedades necessárias à construção da section
            $this->current_section_title = $title;
            $this->current_column_widths = array();
            $this->current_values = $values;
            
            // Substituír a percentagens na column_widths por valores (com base no espaço útil)
            foreach($column_widths as $column_width) {
                $this->current_column_widths[] =  $column_width * ($this->current_document_available_width - ((count($column_widths)-1) * $this->cfg_section_body_columns_gap));
            }

            // Se a página já tem conteúdo, adiciona espaço de separação
            if (!$this->empty_page) {
                $this->setY($this->getY() + $this->cfg_section_space_before);
            }
    
            // Calcula o espaço necessário para o número de linhas mínimo definido na section
            $section_usable_height = $this->getBlockUsableHeight(self::SECTION);
            
            // Verifica se a altura necessária provoca (e executa) uma quebra de página
            $this->customCheckPageBreak($section_usable_height + $this->cfg_section_title_line_height + $this->cfg_section_title_space_after);
            
            // Adiciona o titulo da section
            $this->writeSectionTitle();

            // Adiciona o "corpo" da section
            $this->writeSectionBody();

            // Informa que a página já tem conteúdo
            $this->empty_page = false;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona título da secção ao documento
     *
     * @param bool $continuation = ? Continuação de secção por quebra de página
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */

    private function writeSectionTitle(bool $continuation = false): void {
        try {

            // Atribui a fonte, a cor e a cor fundo para o título  
            $this->SetFont($this->cfg_section_title_font[0], $this->cfg_section_title_font[1], $this->cfg_section_title_font[2]);
            $this->SetTextColor($this->cfg_section_title_color[0], $this->cfg_section_title_color[1], $this->cfg_section_title_color[2]);

            // Se é continuação de secção por quebra de página, calcula posição para simbolo
            $image_x_position = $this->getX() + $this->GetStringWidth($this->current_section_title) + 2;
            $image_y_position = $this->getY()+ $this->cfg_section_title_line_height/4;

            // Adiciona a célula
            $this->Cell($this->current_document_available_width, $this->cfg_section_title_line_height, $this->current_section_title, 0,  1, 'L');

            // Se é continuação de secção por quebra de página, adiciona o simbolo
            if ($continuation) {
                $this->Image($this->cfg_section_title_continuation_file_path, $image_x_position, $image_y_position, 0, $this->cfg_section_title_line_height/2);
            }
            
            // Adiciona a linha
            $this->Line($this->cfg_document_margin_left, $this->getY(), $this->current_document_available_width + $this->cfg_document_margin_left, $this->getY(), array('width' => $this->cfg_section_title_line_thickness));
            
            // Adiciona espaço após o título e linha
            $this->setY($this->getY() + $this->cfg_section_title_space_after);

            // Atribui a fonte e a cor do texto para o corpo da sub_section
            $this->SetFont($this->cfg_section_body_font[0], $this->cfg_section_body_font[1], $this->cfg_section_body_font[2]);
            $this->SetTextColor($this->cfg_section_body_color[0], $this->cfg_section_body_color[1], $this->cfg_section_body_color[2]);
        
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona "corpo" da secção ao documento
     *
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSectionBody(): void {
        try {

            // Atribui as cores para o "zebrado"  
            $this->current_zebra_odd_color = $this->cfg_section_body_zebra_odd_color;
            $this->current_zebra_pair_color= $this->cfg_section_body_zebra_pair_color;
            
            // Atribui a altura mínima de linha
            $this->current_line_height = $this->cfg_section_body_line_height;

            // Inicializa o "zebrado"
            $this->startZebraLines();
            
            // Para cada linha de valores
            foreach ($this->current_values as $line_values) {
                
                 // Calcula o espaço necessário para a linha
                $line_height = $this->getLineHeight($this->cfg_section_body_font, $line_values);

                // Verifica se o espaço necessária provoca (e executa) uma quebra de página
                if ($this->customCheckPageBreak($line_height)) {
                    // Repete o título da section
                    $this->writeSectionTitle(true);
                    // Reinicializa o "zebrado"
                    $this->startZebraLines();
                } 

                // Adição da célula esquerda
                $line_values[0] = $line_values[0] ?? '';
                $this->MultiCell($this->current_column_widths[0], $line_height, trim($line_values[0]), 0, 'L', true, 0, '', '', true, 0, '',true, $line_height, 'M');
                
                // Adição de espaço entre células
                $this->setX($this->x + $this->cfg_section_body_columns_gap);

                // Adição da célula direita
                $line_values[1] = $line_values[1] ?? '';
                $this->MultiCell($this->current_column_widths[1], $line_height, trim($line_values[1]), 0, 'L', true, 1, '', '', true, 0, '',true, $line_height, 'M');

                // Troca a cor no "zebrado" 
                $this->swapZebraLine();

                }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // -------------------------------------------------------- SUB SECTIONS

    
    /**
     * Ativa style para Sub-secção
     *
     * @param int|null = Style da sub-secção (constante)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function setSubSectionStyle(?int $style = null) {
        try {

            // Se não existir nenhum style atribuído, carraga o default
            if (!isset($this->current_sub_section_style)) {
                $this->current_sub_section_style = self::SUB_SECTION_STYLE_DEFAULT;
                foreach ($this->cfg_sub_section_s0 as $key => $value) {
                    $this->{"cfg_sub_section_$key"} = $value;
                }
            }

            // Atribuíção de style à sub-secção se diferente de anterior
            if (isset($style) && $this->current_sub_section_style != $style) {
                $this->current_sub_section_style = $style;

                foreach ($this->{"cfg_sub_section_s$style"} as $key => $value) {
                    $this->{"cfg_sub_section_$key"} = $value;
                }
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // -------------------------------------------------------- SUB SECTION TABLE + ISOLATED TABLE


    /**
     * Adiciona sub-secção do tipo tabela ao documento
     *      A tabela pode ser isolada ou não da secção
     *
     * @param array $titles = Títulos da tabela : array('title', 'title', ...)
     * @param array $values = Valores para tabela : array(array('value, value, ...), ...)
     * @param array $column_widths = Tamanho (width) das colunas em percentagem decimal : array(0.50, 0.25, ...)
     * @param array $column_aligns = Alinhamento da coluna : array ('L', 'C', 'R', ...)
     * @param bool isolated = ? Isolado
     * @param int|null $style = Style da sub-secção (constante)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSubSectionTable(array $titles, array $values, array $column_widths, array $column_aligns, bool $isolated, ?int $style): void {
            try {

            // Informa se a sub-secção é ou não isolada da section
            $this->current_sub_section_isolated = $isolated;
        
            // Propriedades necessárias à construção da sub_section
            $this->current_sub_section_titles = $titles;
            $this->current_column_widths = array();
            $this->current_column_aligns = $column_aligns;
            $this->current_values = $values;
            
            // Substituír a percentagens na column_widths por valores (com base no espaço útil)
            foreach($column_widths as $column_width) {
                $this->current_column_widths[] =  $column_width * ($this->current_document_available_width - ((count($column_widths)-1) * $this->cfg_section_body_columns_gap));
            }

            $this->setSubSectionStyle($style);

            // Se a página já tem conteúdo, adiciona espaço de separação
            if (!$this->empty_page) {
                // Se é uma inserção isolada
                if ($this->current_sub_section_isolated) {
                    $this->setY($this->getY() + $this->cfg_sub_section_isolated_space_before);
                } else { // Se não ...
                    $this->setY($this->getY() + $this->cfg_sub_section_space_before);
                }
            }

            // Calcula o espaço necessário para o número de linhas mínimo definido na sub_section
            $sub_section_usable_height = $this->getBlockUsableHeight(self::SUB_SECTION);
            
            // Verifica se a altura necessária provoca (e executa) uma quebra de página
            if($this->customCheckPageBreak($sub_section_usable_height + $this->cfg_sub_section_body_line_height)) {
                // Se a sub-secção não é isolada, repete o título da section owner na nova página
                if (!$this->current_sub_section_isolated) {
                    $this->writeSectionTitle(true);
                }
            }
            
            // Adiciona o titulo da sub_section
            $this->writeSubSectionTitle();

            // Adiciona o "corpo" da sub_section
            $this->writeSubSectionBody();

            // Informa que a página já tem conteúdo
            $this->empty_page = false;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona título da sub-secção ao documento
     *
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSubSectionTitle(): void {
        try {

            // Atribui a fonte, a cor e a cor fundo para o título  
            $this->SetFont($this->cfg_sub_section_title_font[0], $this->cfg_sub_section_title_font[1], $this->cfg_sub_section_title_font[2]);
            $this->SetTextColor($this->cfg_sub_section_title_color[0], $this->cfg_sub_section_title_color[1], $this->cfg_sub_section_title_color[2]);
            $this->SetFillColor($this->cfg_sub_section_title_backcolor[0], $this->cfg_sub_section_title_backcolor[1], $this->cfg_sub_section_title_backcolor[2]);

            // Conta número de títulos
            $titles_count = count($this->current_sub_section_titles);

            // Para cada título (coluna)
            $lastcolumn = false;
            foreach ($this->current_sub_section_titles as $key => $title) {
                // Verifica se é a última coluna
                if ($key + 1 == $titles_count) {
                    $lastcolumn = true;
                }
                // Adiciona a célula
                $this->Cell($this->current_column_widths[$key], $this->cfg_sub_section_title_line_height, $title, 0, (int)$lastcolumn, 'C', true);
                // Se não é a última coluna, adiciona o espaço de separação entre colunas
                if (!$lastcolumn) {$this->setX($this->getX() +  $this->cfg_sub_section_columns_gap);}
            }

            // Adiciona espaço a seguir ao título
            $this->setY($this->getY() + $this->cfg_sub_section_title_space_after);

            // Atribui a fonte, a cor e a cor fundo do texto para o corpo da sub_section
            $this->SetFont($this->cfg_sub_section_body_font[0], $this->cfg_sub_section_body_font[1], $this->cfg_sub_section_body_font[2]);
            $this->SetTextColor($this->cfg_sub_section_body_color[0], $this->cfg_sub_section_body_color[1], $this->cfg_sub_section_body_color[2]);
            $this->SetFillColor(255, 255, 255);

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona "corpo" da sub-secção ao documento
     *
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSubSectionBody(): void {
        try {

            // Atribui as cores para o "zebrado"  
            $this->current_zebra_odd_color = $this->cfg_sub_section_body_zebra_odd_color;
            $this->current_zebra_pair_color = $this->cfg_sub_section_body_zebra_pair_color;

            // Atribui a altura mínima de linha
            $this->current_line_height = $this->cfg_sub_section_body_line_height;

            // Inicializa o "zebrado"
            $this->startZebraLines();

            // Para cada linha de valores
            foreach ($this->current_values as $key => $line_values) {

                // Calcula o espaço necessário para a linha
                $line_height = $this->getLineHeight($this->cfg_sub_section_body_font, $line_values);

                // Verifica se a espaço necessário provoca (e executa) uma quebra de página
                if ($this->customCheckPageBreak($line_height)) {
                    // Se a sub-secção não é isolada, repete o título da section owner na nova página
                    if (!$this->current_sub_section_isolated) {
                        //Adiciona título da section
                        $this->writeSectionTitle(true);
                    }
                    // Repete o título da sub_section
                    $this->writeSubSectionTitle();
                    // Reinicializa o "zebrado"
                    $this->startZebraLines();
                }
                
                // Para cada valor (coluna) da linha
                foreach ($line_values as $key => $value) {

                    // Controlo de valor nulo
                    $value = $value ?? '';

                    // Verifica se é a última coluna
                    $lastcolumn = false;
                    if ($key + 1 == count($line_values)) {
                        $lastcolumn = true;
                    }

                    // Se o valor é booleano, corresponde a uma checkbox (image)
                    if (is_bool($value)) {

                        // True ou False
                        $image_file_name = $value ? 'checkbox_checked.jpg' : 'checkbox.jpg';

                        // Posição da checkbox na coluna
                        switch ($this->current_column_aligns[$key]) {
                            case 'L': // Esquerda
                                $image_x_position = $this->getX() + 1.7;
                                break;
                            case 'C': // Centro
                                $image_x_position = $this->getX() + ($this->current_column_widths[$key] / 2) - 1.1;
                                break;
                            case 'R': // Direita
                                $image_x_position = $this->getX() + $this->current_column_widths[$key] - 4;
                                break;
                        }

                        // Adição da célula (fundo)
                        $this->Cell($this->current_column_widths[$key], $line_height, '', 0, 0, $this->current_column_aligns[$key], true);

                        // Adição da checkbox
                        $this->Image(FRAMEWORK_RESOURCES_PATH . 'pdf/' . $image_file_name, $image_x_position, $this->getY() + $line_height/2 - 1.2, 2.5);
                    
                        // Se é a última coluna, salta de linha
                        if ($lastcolumn) {
                            $this->Cell(0, $line_height, '', 0, 1);
                        }

                    } else { // Valor "normal"

                        // Adição da célula
                        $this->MultiCell($this->current_column_widths[$key], $line_height, trim($value), 0, $this->current_column_aligns[$key], true, (int)$lastcolumn, '', '', true, 0, '', true, $line_height, 'M');
                    }

                    // Se não é a última coluna, adiciona o espaço de separação entre colunas
                    if (!$lastcolumn) {
                        $this->setX($this->getX() + $this->cfg_sub_section_columns_gap);
                    }

                }

                // Troca a cor no "zebrado" 
                $this->swapZebraLine();

            }
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // -------------------------------------------------------- SUB SECTION IMAGES + ISOLATED IMAGES


    /**
     * Adiciona secção de imagens ao documento
     *
     * @param string $title = Título da secção
     * @param array $values = Imagens : array(array('image_path', rotation), ...)
     * @param int $columns = Número de imagens por linha
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSectionImages(string $title, array $values, int $columns): void {
        try {

            // Propriedades necessárias à construção da sub_section
            $this->current_section_title = $title;
            $this->current_values = $values;
    
            // Prepara o bloco de imagens devolvendo uma array com as linhas de imagens e a respectiva altura
            $images_lines = $this->prepareImagesBlock($columns);

            // Verifica se a altura necessária para a primeira linha de imagens provoca (e executa) uma quebra de página
            $this->customCheckPageBreak($images_lines[0]['height'] + $this->cfg_section_title_line_height + $this->cfg_section_title_space_after);
            
            // Adiciona espaço antes da sub_section
            if (!$this->empty_page) {
                $this->setY($this->getY() + $this->cfg_section_space_before);
            }
            
            // Adiciona título
            $this->writeSectionTitle();

            // Adiciona espaço antes das imagens
            $this->setY($this->getY() + $this->cfg_block_images_space_before - $this->cfg_section_title_space_after);

            // Adiciona blocp de imagens
            $this->writeImagesBlock($images_lines, $columns, true);

            // Informa que a página já tem conteúdo
            $this->empty_page = false;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona sub-secção de imagens ao documento
     *
     * @param string $title = Título da sub-secção
     * @param array $values = Imagens : array(array('image_path', rotation), ...)
     * @param int $columns = Número de imagens por linha
     * @param int|null $style = Style da sub-secção (constante)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSubSectionImages(string $title, array $values, int $columns, ?int $style): void {
        try {

            // Ativar style da sub_section
            $this->setSubSectionStyle($style);
                    
            // Propriedades necessárias à construção da sub_section
            $this->current_sub_section_titles = array($title);
            $this->current_column_widths = array($this->current_document_available_width);
            $this->current_column_aligns = array('L');
            $this->current_values = $values;

    
            // Prepara o bloco de imagens devolvendo uma array com as linhas de imagens e a respectiva altura
            $images_lines = $this->prepareImagesBlock($columns);

            // Verifica se a altura necessária para a primeira linha de imagens provoca (e executa) uma quebra de página
            $this->customCheckPageBreak($images_lines[0]['height'] + $this->cfg_sub_section_title_line_height + $this->cfg_sub_section_title_space_after);
            
            // Adiciona espaço antes da sub_section
            if (!$this->empty_page) {
                $this->setY($this->getY() + $this->cfg_sub_section_space_before);
            }
            
            // Adiciona título
            $this->writeSubSectionTitle();

            // Adiciona espaço antes das imagens
            $this->setY($this->getY() + $this->cfg_block_images_space_before);

            // Adiciona blocp de imagens
            $this->writeImagesBlock($images_lines, $columns, false);

            // Informa que a página já tem conteúdo
            $this->empty_page = false;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona bloco de imagens ao documento
     *      O bloco pode ser isolado (apresentado como uma section) ou não (apresentado como uma sub_section)
     *
     * @param array $images_lines = Linhas de imagens
     * @param int $columns = Número de imagens por linha
     * @param bool $isolated = ? Isolado
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeImagesBlock(array $images_lines, int $columns, bool $isolated): void {
        try {

            // Calcula o espaço (width) disponível para cada imagem em linha
            $available_column_width = ($this->current_document_available_width - ($this->cfg_block_images_gap * ($columns - 1))) / $columns;

            // Para cada linha de imagens
            $images_lines_counter = 0;
            foreach ($images_lines as $images_line) {
                $images_lines_counter++;
                
                // Verifica se a altura necessária para a linha de imagens provoca (e executa) uma quebra de página
                if ($this->customCheckPageBreak($images_line['height'])) {
                    if ($isolated) {
                        $this->writeSectionTitle(true);
                    } else {
                        // Adiciona título da section
                        $this->writeSectionTitle(true);
                        // Repete o título da sub_section
                        $this->writeSubSectionTitle();
                        // Adiciona espaço antes das imagens
                        $this->setY($this->getY() + $this->cfg_block_images_space_before);
                    }
                }
                
                // Adiciona as imagens da linha
                foreach ($images_line['images'] as $key => $image) {
                    if (file_exists($image['file_path'])) {
                        // CaLcula a margem necessária para centrar a imagem no seu espaço
                        $center_image_margin_left = ($available_column_width - $image['width']) / 2;
                        $this->SetX($this->cfg_document_margin_left + ($key * $available_column_width) + ($key * $this->cfg_block_images_gap) + $center_image_margin_left);
                        $this->Image($image['file_path'], '', '', $image['width'], $image['height']);
                        // Elimina a imagem se é temporária
                        if ($image['tmp']) {
                            unlink($image['file_path']);
                        }
                    }
                }

                // Se a linha de imagens não é a última, adiciona espaço antes da próxima
                if ($images_lines_counter < count($images_lines)) {
                    $this->SetY($this->getY() + $images_line['height'] + $this->cfg_block_images_gap);
                }
            }
            // Adiciona o espaço ocupado pela última linha
            $this->SetY($this->getY() + $images_line['height']);

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    
    /**
     * Prepara bloco de imagens
     *      Devolve as imagens agrupadas por linhas (dependendo do número de colunas)
     *      Cada linha contém o espaço (height) que vai consumir no documento
     *
     * @param int $columns = Número de imagens por linha
     * 
     * @return array = Linhas de imagens : array(height, array('prepared_image', ...), ...)
     * 
     * @pmonteiro (2020-03-02)
     */
    private function prepareImagesBlock(int $columns): array {
        try {

            // Calcula o maior lado permitido às imagem
            $available_image_max_side = ($this->current_document_available_width - ($this->cfg_block_images_gap * ($columns - 1))) / $columns;
            
            // Se o maior lado permitido calculado for superior ao permitido, ajusta-o
            if ($this->cfg_block_images_image_max_side < $available_image_max_side) {
                $available_image_max_side = $this->cfg_block_images_image_max_side;
            }
            

            // Remove imagens inexistentes da lista de imagens
            // Para cada imagem
            foreach ($this->current_values as $key => $image) {
                if (!isset($image) || !file_exists($image[0])) {
                    unset($this->current_values[$key]);
                }
            }


            // Para cada imagem
            $prepared_images = array();
            $images_lines = array();
            $images_counter = 0;
            $line_images_counter = 0;
            $line_height = 0;
            foreach ($this->current_values as $image) {

                    $images_counter++;
                    $line_images_counter++;
                    
                    // Preparar a imagem
                    $prepared_image = $this->prepareImage($image[0], $image[1], $available_image_max_side, $available_image_max_side, false);
                    $prepared_images[] = $prepared_image;
                
                     // Guarda a maior altura das imagens da linha
                    if ($prepared_image['height'] > $line_height) {
                        $line_height = $prepared_image['height'];
                    }

                    // Verifica se é a última imagem da linha ou da lista
                    if ($line_images_counter == $columns || $images_counter == count($this->current_values)) {
                        $images_line = array();
                        $images_line['height'] = $line_height;
                        $images_line['images'] = $prepared_images;
                        $images_lines[] = $images_line;
                        $prepared_images = array();
                        $line_images_counter = 0;
                        $line_height = 0;
                    }
                }

            return $images_lines;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

  
    /**
     * Prepara imagem para adição ao documento
     *
     * @param string $file_path = File path do ficheiro
     * @param int $rotation = Rotação a aplicar à imagem
     * @param int $desired_width = Comprimento desejado
     * @param int $desired_height = Altura desejado
     * @param bool $crop = ? Corta margens brancas
     * 
     * @return array = Informação de imagem preparada 
     * 
     * @pmonteiro (2020-03-02)
     */
    private function prepareImage(string $file_path, int $rotation, int $desired_width, int $desired_height, bool $crop): array {
        try {

            // Carregar imagem em objecto imagem
            switch(pathinfo($file_path, PATHINFO_EXTENSION)) {
                case 'jpg':
                case 'jpeg':
                    $source_image = imagecreatefromjpeg($file_path);
                    break;
                case 'png':
                    $source_image = imagecreatefrompng($file_path);
                    break;
                case 'bmp':
                    $source_image = imagecreatefromwbmp($file_path);
                    break;
                case 'gif':
                    $source_image = imagecreatefromgif($file_path);
                    break;
                default:
            }

            // Corta margens brancas
            if ($crop) {
                $source_image = imagecropauto($source_image, IMG_CROP_WHITE);
                $resample = true;
            } 
            
            // Aplica rotação à imagem
            if ((bool) $rotation) {
                $source_image = imagerotate($source_image, $rotation, 0);	
                $resample = true;
            }
        
            // Atribui valores a varáveis de trabalho (para cálculo de dimensões) 
            $save_width = $show_width = $width = imagesx($source_image);
            $save_height =  $show_height = $height = imagesy($source_image);

            // Calcula as dimensões proporcionais da imagem tendo por base 
            // os valores máximos definidos para o comprimento e altura
            if ($show_width > $desired_width) {
                $factor = $desired_width / $width;
                $show_width = $show_width * $factor;
                $show_height = $show_height * $factor;
            }
            if ($show_height > $desired_height) {
                $factor = $desired_height / $show_height;
                $show_width = $show_width * $factor;
                $show_height = $show_height * $factor;
            }

            // Se a imagem tiver um dos lados superior a 750 pixel's, 
            // recalcula as suas dimensões proporcionais e marca 
            // para redimensionamento e gravação temporária
            $resample = false;
            if ($save_height > $save_width) {
                if ($save_height > 750) {
                    $save_height = 750;
                    $factor = $save_height / $height;
                    $resample = true;
                }
                $save_width = $width * $factor;
            } else {
                if ($save_width > 750) {
                    $save_width = 750;
                    $factor = $save_width / $width;
                    $resample = true;
                }
                $save_height = $height * $factor;
            }

            // Redimensionamento e gravação temporária
            $tmp = false;
            if ($resample) {

                $virtual_image = imagecreatetruecolor($save_width, $save_height);
                imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $save_width, $save_height, $width, $height);
                
                $file_path = CORE_TMP_PDF_PATH . uniqid() . '.jpg';
                imagejpeg($virtual_image, $file_path);

                $tmp = true;

            }

            return array('file_path' => $file_path, 'width' => $show_width, 'height' => $show_height, 'tmp' => $tmp);
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    
    /**
     * Adiciona assinatura ao documento
     *
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function writeSignature(): void {
        try {
            
            // Valida se o ficheiro existe
            if (file_exists($this->current_signature_file_path)) {

                // Prepara a imagem
                $prepared_image = $this->prepareImage($this->current_signature_file_path, 0, $this->cfg_signature_desired_width, $this->cfg_signature_desired_height, true);

                // Adiciona espaço antes da assinatura
                $this->setY($this->getY() + $this->cfg_signature_space_before);

                // Atribui a fonte e a cor para o título  
                $this->SetFont($this->cfg_signature_title_font[0], $this->cfg_signature_title_font[1], $this->cfg_signature_title_font[2]);
                $this->SetTextColor($this->cfg_signature_title_color[0], $this->cfg_signature_title_color[1], $this->cfg_signature_title_color[2]);

                // Adiciona título
                $this->Cell($this->current_document_available_width/2, $this->cfg_signature_title_line_height, $this->cfg_signature_title, 0, 0, 'R');

                 // Adiciona linha
                $this->Line($this->getX(), $this->getY() + $this->cfg_signature_title_line_height, $this->getX() + $this->cfg_signature_line_width, $this->getY() + $this->cfg_signature_title_line_height, array('width' => $this->cfg_signature_line_thickness));
                
                // Margem para assinatura após a inserção do título
                $signature_margin_left = $this->getX() + ($this->cfg_signature_line_width - $prepared_image['width']) /2;

                // Adiciona assinatura
                $this->Image($prepared_image['file_path'], $signature_margin_left, $this->getY() + $this->cfg_signature_title_line_height - $prepared_image['height'] - 1, 0, $prepared_image['height']);
                
                // Atribui a fonte e a cor para o nome  
                $this->SetFont($this->cfg_signature_name_font[0], $this->cfg_signature_name_font[1], $this->cfg_signature_name_font[2]);
                $this->SetTextColor($this->cfg_signature_name_color[0], $this->cfg_signature_name_color[1], $this->cfg_signature_name_color[2]);

                // Posiciona nome
                $this->setXY($this->getX(), $this->getY() + 5 + $this->cfg_signature_line_thickness);

                // Adiciona nome
                $this->Cell($this->cfg_signature_line_width, $this->cfg_signature_name_line_height, $this->current_signature_name, 0, 0, 'C');

                if ($prepared_image['tmp']) {
                    unlink($prepared_image['file_path']);
                }
                
            }
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

   
    /**
     * Inicia o "zebrado" 
     *
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function startZebraLines(): void {
        try {

            $this->SetFillColor($this->current_zebra_odd_color[0], $this->current_zebra_odd_color[1], $this->current_zebra_odd_color[2]);
            $this->current_zebra_odd = true;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Troca o fundo a aplicar à próxima linha de um "zebrado"
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function swapZebraLine(): void {
        try {

            if ($this->current_zebra_odd) {
                $this->SetFillColor($this->current_zebra_pair_color[0], $this->current_zebra_pair_color[1], $this->current_zebra_pair_color[2]);
                $this->current_zebra_odd = false;
            } else {
                $this->SetFillColor($this->current_zebra_odd_color[0], $this->current_zebra_odd_color[1], $this->current_zebra_odd_color[2]);
                $this->current_zebra_odd = true;
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Calcula a altura necessária para inserção dos elementos iniciais mínimos de um bloco
     * Este calculo é necessário para garantir que não seja possível ter blocos só com o título
     *      ou pouco espaço de linhas no fim de uma página e posterior quebra de página. 
     *
     * ATENÇÃO: Depende de uma instância "gost" de TCPDF
     * 
     * @param int $type = Tipo de bloco (constante)
     * 
     * @return float = Altura da mínima necessária
     * 
     * @pmonteiro (2020-03-02)
     */
	private function getBlockUsableHeight(int $type): float {
        try {

            // Atribuíção de variáveis de trabalho dependentes do tipo de bloco
            switch ($type) {
                case self::SECTION:
                    $font = $this->cfg_section_body_font;
                    $line_height = $this->cfg_section_body_line_height;
                    $fit_lines = $this->cfg_section_body_must_fit_lines;
                    break;
                case self::SUB_SECTION:
                    $font = $this->cfg_sub_section_body_font;
                    $line_height = $this->cfg_sub_section_body_line_height;
                    $fit_lines = $this->cfg_sub_section_body_must_fit_lines;
                    break;
            }

            // Atribui a fonte à instância de pdf "ghost"
            // Da fonte depende a altura
            $this->ghost_pdf->SetFont($font[0], $font[1], $font[2]);

            $sum_lines_height = 0;
            // Itera as primeiras linhas (definidas) para cálculo da soma das suas alturas
            foreach (array_slice($this->current_values, 0, $fit_lines) as $line_values) {
                $index = 0;
                $max_line_height = 0;
                // Para cada um dos valores (colunas)
                foreach ($line_values as $value) {
                    // Coloca a célula nas coordenadas (0,0)
                    $this->ghost_pdf->setX(0);
                    $this->ghost_pdf->setY(0);
                    $this->ghost_pdf->MultiCell($this->current_column_widths[$index], $line_height, $value, 0, 'L', true, 1, '', '', true, 0, '', true, 0, 'M');
                    // Guarda a maior altura das colunas da linha
                    if ($this->ghost_pdf->getY() > $max_line_height) {
                        $max_line_height = $this->ghost_pdf->getY();
                    }
                    $index++;
                }
                // Soma a altura da linha anterior
                $sum_lines_height += $max_line_height;
                if ($sum_lines_height >= 3 * $line_height) {
                    break;
                }
            }
            
            return $sum_lines_height;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Valida se a utilização de uma deteminado espaço (heigth) provoca (e executa) uma quebra de página
     *
     * @param float $height = Espaço a considerar
     * 
     * @return boolean = ? Quebrou 
     * 
     * @pmonteiro (2020-03-02)
     */
	private function customCheckPageBreak(float $height): bool {
        try {
            $result = false;
                       
            $limit = $this->getPageHeight() - $this->cfg_footer_size;

            if ($this->write_signature) {
                $height += $this->cfg_signature_space_before + $this->cfg_signature_space_after;
            }

            if ($this->GetY() + $height > $limit) {
                    $this->customAddPage();
                    $result = true;

            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona nova página ao documento
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-02)
     */
    private function customAddPage(): void {
        try {

            $this->empty_page = true;
            $this->AddPage();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve a altura de uma linha de multicell's após a inserção dos seus conteúdos
     * A altura está dependente da fonte a utilizar
     * 
     * ATENÇÃO: Depende de uma instância "gost" de TCPDF
     *
     * @param array $font = Fonte a considerar : array('font_name', 'style', size)
     * @param array $line_values = Valores a inserir
     * @return float = Altura da linha 
     * 
     * @pmonteiro (2020-03-02)
     */
	private function getLineHeight(array $font, array $line_values): float {
        try {

            // Atribui a fonte a considerar 
            $this->ghost_pdf->SetFont($font[0], $font[1], $font[2]);

            // Para cada uma das células (valores)
            $max_line_height = 0;
            $index = 0;
            foreach ($line_values as $value) {
                // Reinicializa as coordenadas
                $this->ghost_pdf->SetX(0);
                $this->ghost_pdf->SetY(0);
                // Adiciona o multicell
                $this->ghost_pdf->MultiCell($this->current_column_widths[$index], $this->current_line_height, $value, 0, 'L', true, 1, '', '', true, 0,'',true, 0, 'M');
                // Recolhe a altura
                $height = $this->ghost_pdf->getY();
                // Guarda a maior altura das colunas em linha
                if ($height > $max_line_height) {
                    $max_line_height = $height;
                }
                $index++;
            }

            // Se a altura calculada é maior qua a altura base, adiciona espaço para margens 
            if ($max_line_height > $this->cfg_section_title_line_height) {$max_line_height += 3;}

            return $max_line_height;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    /**
     * Reset de template
     *
     * @return void
     * 
     * @pmonteiro (2020-03-05)
     */
    public function tplReset(): void {
        try {

            $this->current_zebra_odd = true; 
            $this->empty_page = true;
            $this->write_signature = false;
            $this->contents = array();
            $this->last_content_index = 0;
            $this->ghost_pdf = new \TCPDF();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END