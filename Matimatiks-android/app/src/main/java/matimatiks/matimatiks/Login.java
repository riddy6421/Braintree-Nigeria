package matimatiks.matimatiks;

import android.animation.ObjectAnimator;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.DecelerateInterpolator;
import android.widget.ProgressBar;

import com.google.firebase.auth.FirebaseAuth;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by ridwan on 9/1/2016.
 */
public class Login extends AppCompatActivity {
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_splash);
        firebaseAuth = FirebaseAuth.getInstance();
        ProgressBar circularProgressBar = findViewById(R.id.progressBar1);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }

        if (firebaseAuth.getCurrentUser() != null) {
            ObjectAnimator objectAnimator = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                objectAnimator = ObjectAnimator.ofInt(circularProgressBar, "progress", 0, 3000);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                if (objectAnimator != null) {
                    objectAnimator.setDuration(3000);
                }
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                if (objectAnimator != null) {
                    objectAnimator.setInterpolator(new DecelerateInterpolator());
                }
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
                if (objectAnimator != null) {
                    objectAnimator.start();
                }
            }


            StartAnotherActivity();
        }
    }

    public void StartAnotherActivity() {

        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                Login.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        startActivity(new Intent(Login.this, Exam_category.class));
                    }
                });
            }
        }, 3000);

    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }


}

