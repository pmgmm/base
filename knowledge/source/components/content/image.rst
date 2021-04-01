.. index:: Image

.. _image:

Image
=====

Este componente mostra uma imagem e eventualmente usa-a como link.

.. image:: ../resources/image.png

Requisitos
---------- 
         
=================================== ===============
``/framework/components/image.js`` 
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-image>
        <span slot="information">texto</span>
    </fwk-image>

==================== ================================= =========== ======================= ============
Atributo             Descrição                         Obrigatório Opções                  Default
==================== ================================= =========== ======================= ============
``id``               Identificador único do componente Sim (?)        
``src``              Endereço da imagem (=html)        Sim
``disable``          Inibe componente                  Não         "true", "false"         "false" 
``hide``             Esconde componente                Não         "true", "false"         "false" 
``color``            Cor da border e tooltip           Não         "blue", "gray", "white" "gray" 
``border``           Espessura da border               Não         "1", "2", ...           "0"
``circle``           Formato circular                  Não         "true", "false"         "false"  
``width``            Largura da imagem                 Não                                 Herda do pai 
``height``           Altura da imagem                  Não                                 Herda do pai 
``tooltip-position`` Posição do tooltip                Não         "left", "right"         "right"
``function``         Função a executar no evento click Não     
``script``           Script a executar no evento click Não    
==================== ================================= =========== ======================= ============

.. important:: 

    O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

    Os atributos ``function`` e ``script`` são mutuamente exclusivos.

    Os atributos ``width`` e ``height`` são mutuamente exclusivos. No caso de nenhum deles estiver preenchido, são ambos herdados do pai. Se um deles estiver preenchido, o outro é calculado proporcionalmente.

=============== ===================== =========== ===========
Slot            Descrição             Obrigatório Observações
=============== ===================== =========== ===========
``icon``        Icone de botão        Não
``information`` Tooltip de informação Não         Admite html
=============== ===================== =========== ===========

----

Função de componente
--------------------

O atributo ``function`` destina-se a definir a chamada a uma função global ou a um método de classe. Os formatos permitidos são:

====================================== ==========================================                                        
Função global (formatos)               Método de classe (formatos)                             
====================================== ==========================================
function = "gotoHome"                  function = "obj.gotoHome"                  
function = '{"gotoHome":[param1,...]}' function = '{"obj.gotoHome":[param1,...]}'
====================================== ==========================================

----

Script de componente
--------------------

O atributo ``script`` destina-se a definir o script a ser executado. É permitido qualquer script válido.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_image = FormHelper.getComponent('fwk_image');

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_image.hide = false;
    obj_image.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_image.disable = false;
    obj_image.disable = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_image.hide;
    let is_disable = obj_image.disable;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.