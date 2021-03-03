module TimetablesHelper
    def iso_image(id)
        return image_tag 'hima.png', :width => '80', :height => '80', :id => id
    end

    def go_home_button
        return button_to "最初に戻る", {controller: 'application', action: 'index'}, {method: :get, params:{num1:'fromTM'},class: 'button go-home'}
    end

end
